'use strict';

import * as fs from 'fs';

let mode
process.argv.forEach(function (val, _index, _array) {
    mode = val;
});

processFile('../../schemas/airspace/package.json', mode)
processFile('../../schemas/holding-pattern/package.json', mode)
processFile('../../schemas/travel-document-checkpoint/package.json', mode)

export function processFile(filePath) {
    let rawdata = fs.readFileSync(filePath);
    let packageJson = JSON.parse(rawdata);

    if (mode === 'internal') {
        // Switch to app bundles to prevent duplicate entries for API tokens, Entity classes and additional resources
        packageJson.main = "dist/app/bundle.mjs"
        packageJson.module = "dist/app/bundle.mjs"
        packageJson.types = "dist/app/bundle.d.ts"
    } else if (mode === 'external') {
        // Switch back to client bundles
        packageJson.main = "dist/cjs/index.js"
        packageJson.module = "dist/esm/index.mjs"
        packageJson.types = "dist/index.d.ts"
    } else {
        throw new Error('Unknown mode: ' + mode)
    }

    fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
}
