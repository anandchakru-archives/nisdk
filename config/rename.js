const replace = require('replace-in-file');

/**
 * The name in /dist/nlib/package.json should be nlib for ~ng build nelem --prod~ to work
 * The name in /dist/nlib/package.json should be @nivite/nlib for publishing it to npmjs
 * 
 * So doing
 *  node ./config/rename.js 
 * only for
 *  npm run publish:lib
 *  npm run package:lib
 * 
 * but not for 
 *  npm run build:lib
 *  npm run build:elem
 *  npm run publish:elem
 */
replace.sync({
    files: './dist/nlib/package.json',
    from: '"name": "nlib",',
    to: '"name": "@nivite/nlib",',
})