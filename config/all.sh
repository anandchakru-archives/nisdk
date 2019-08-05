#!/bin/bash
scriptPath=$(dirname "$0")
commitMsg="$1"
if [ -z "$1" ]; then
  echo -e "\nWARN: Empty commit message, using date. Next time invoke it like this: '$0 <argument>'\n"
  commitMsg="$(date '+%Y%m%d%H%M')"
  else
  commitMsg="$1"
fi

npm version patch && (cd ./projects/nlib; npm version patch) && npm run buildinfo && git status && git add --all && git status && git commit --message "$commitMsg" && npm run publish:lib && git push && git push --tags