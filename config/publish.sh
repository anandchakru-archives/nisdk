#!/usr/bin/env bash
#
# Author: Stefan Buck
# License: MIT
# Modified from https://gist.github.com/stefanbuck/ce788fee19ab6eb0b4447a85fc99f447
#
#
# This script accepts the following parameters:
#
# * filename
# * tag
#
# Script to upload a release asset using the GitHub API v3.
#
# Example:
#
# publish.sh filename=./dist/nelem/nivite-sdk-es5.js tag=v1.0.5
#
# Check dependencies.

urldecode() { : "${*//+/ }"; echo -e "${_//%/\\x}"; }

generate_post_data()
{
  cat <<EOF
{
  "tag_name": "$tag",
  "target_commitish": "master",
  "name": "$tag",
  "body": "$tag",
  "draft": false,
  "prerelease": false
}
EOF
}

set -e
xargs=$(which gxargs || which xargs)

# Validate settings.
[ "$TRACE" ] && set -x

CONFIG=$@

for line in $CONFIG; do
  eval "$line"
done

# Define variables.
owner=nivite
repo=nisdk
GH_API="https://api.github.com"
GH_REPO="$GH_API/repos/$owner/$repo"
GH_TAGS="$GH_REPO/releases/tags/$tag"
WGET_ARGS="--content-disposition --auth-no-challenge --no-cookie"
CURL_ARGS="-LJO#"
username="`grep -oP '(?<=https:\/\/)(.*)(?=:\S+@github.com)' ~/.git-credentials`"
password=`grep -oP "(?<=https:\/\/$username:)(.*)(?=@github.com)" ~/.git-credentials`
password=$(urldecode "$password")
AUTH="$username:$password"

# Validate token.
curl -o /dev/null -s --user "$AUTH" $GH_REPO || { echo "Error: Invalid repo, token or network issue!";  exit 1; }

if [[ "$tag" == 'LATEST' ]]; then
    GH_TAGS="$GH_REPO/releases/latest"
    # Read asset tags.
    response=$(curl -s --user "$AUTH" $GH_TAGS)
  else
    # create a new release
    # postData="{\"tag_name\":\"$tag\", \"name\":\"$tag\", \"draft\":\"false\"}"
    response=$(curl --user "$AUTH" -i -d "$(generate_post_data)" -H "Content-Type: application/json" -X POST "$GH_REPO/releases")
fi

# Get ID of the release
eval $(echo "$response" | grep -m 1 "id.:" | grep -w id | tr : = | tr -cd '[[:alnum:]]=')
[ "$id" ] || { echo "Error: Failed to get release id for tag: $tag"; echo "$response" | awk 'length($0)<100' >&2; exit 1; }

# Construct url
GH_ASSET="https://uploads.github.com/repos/nivite/nisdk/releases/$id/assets?name=$(basename $filename)"
echo "CURL: $GH_ASSET"

# Upload asset
echo "Uploading asset to release: $id"

response=$(curl --user "$AUTH" --data-binary @"$filename" -H "Content-Type: application/octet-stream" $GH_ASSET)

echo "Uploaded asset: $response"

# https://api.github.com/repos/nivite/nisdk/git/refs/tags
# https://api.github.com/repos/nivite/nisdk/releases/latest
# https://api.github.com/repos/nivite/nisdk/releases/tags/v1.0.3
# https://api.github.com/repos/nivite/nisdk/releases/tags/v1.0.3
# 
# CREATE RELEASE
# https://api.github.com/repos/nivite/nisdk/releases
# {
#  "tag_name": "v1.0.0",
#  "target_commitish": "master",
#  "name": "v1.0.0",
#  "body": "Description of the release",
#  "draft": false,
#  "prerelease": false
# }
