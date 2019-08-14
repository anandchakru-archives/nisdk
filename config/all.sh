#!/bin/bash
scriptPath=$(dirname "$0")
commitMsg="$1"
if [ -z "$1" ]; then
  echo -e "\nWARN: Empty commit message, using date. Next time invoke it like this: '$0 <argument>'\n"
  commitMsg="$(date '+%Y%m%d%H%M')"
  else
  commitMsg="$1"
fi

# commit all the changes
git status && git add --all && git status && git commit --message "$commitMsg"
# patch the version (this also creates a new tag)
npm version patch && (cd ./projects/nlib; npm --no-git-tag-version --force version patch)
# update buildinfo with new version
npm run buildinfo
# build nelem
npm run build:elem
# build nlib
npm run publish:lib
# push tags to github
git push && git push --tags
# push nelem to github-releases
newTag=$(git describe --exact-match $(git rev-list --tags --date-order --max-count=1) --tags)
./config/publish.sh filename=./dist/nelem/nivite-sdk-es5.js tag="$newTag"
./config/publish.sh filename=./dist/nelem/nivite-sdk-es2015.js tag="LATEST"