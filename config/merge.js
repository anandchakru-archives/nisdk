'use strict';
const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const files5 = [
        './dist/nelem/runtime-es5.js',
        './dist/nelem/polyfills-es5.js',
        './dist/nelem/scripts.js',
        './dist/nelem/main-es5.js',
    ]
    const files2015 = [
        './dist/nelem/runtime-es2015.js',
        './dist/nelem/polyfills-es2015.js',
        './dist/nelem/scripts.js',
        './dist/nelem/main-es2015.js',
    ]
    await fs.ensureDir('./dist/nelem');
    await concat(files5, './dist/nelem/nivite-sdk-es5.js');
    await concat(files2015, './dist/nelem/nivite-sdk-es2015.js');
})();