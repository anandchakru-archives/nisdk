/**
 * 
 * Deprecated: couldnt find the reason for the following error while executing it
 * 
 * requires npm i -D @octokit/rest
 *
 * f:HttpError: Problems parsing JSON
 * 
 * Use publish.sh
 * 
 */
const fs = require('fs-extra');
const { basename, parse, resolve, relative } = require('path');
const Octokit = require('@octokit/rest');
// https://regex101.com/r/N5spik/2 - works only chrome, positive look ahead not supported by all browsers yet
const credExtraRegEx = new RegExp(/(?<=https:\/\/)(.*?)(?=:)[^](.*)(?=@github.com)/);

const homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

const credUrl = fs.readFileSync(homeDir + '/.git-credentials', 'utf8');
const credMatches = credUrl.match(credExtraRegEx);
if (credMatches && credMatches.length >= 3) {
  const octokit = new Octokit({
    org: 'nivite',
    baseUrl: 'https://api.github.com',
    auth: {
      username: credMatches[1],
      password: decodeURIComponent(credMatches[2])
    }
  });
  console.log(octokit.repos.getLatestRelease({
    owner: 'nivite',
    repo: 'nisdk'
  }).then(rsp => {
    console.log(rsp.data);
    console.log('url:' + rsp.data.url);
    console.log('tag:' + rsp.data.tag_name);
    const filePath = resolve(__dirname, '..', 'dist', 'nelem', 'nivite-sdk-es2015.js');
    const options = {
      url: rsp.data.url,
      file: fs.createReadStream(filePath),
      name: basename(filePath),
      headers: {
        'content-type': 'application/octet-stream',
        'content-length': fs.statSync(filePath).size
      }
    }
    console.log('options:' + JSON.stringify(options));
    octokit.repos.uploadReleaseAsset(options).then(rsp => {
      console.log('uploaded ' + filePath + ' to ' + rsp.data.browser_download_url);
    }).catch(r => console.log('f:' + r));
  }).catch(r => console.log('e:' + r)));
}