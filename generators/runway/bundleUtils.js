'use strict';

import * as fs from 'fs';

let mode
process.argv.forEach(function (val, _index, _array) {
    mode = val;
});

processFile('../../schemas/airspace/package.json', 'airspace', mode)
processFile('../../schemas/holding-pattern/package.json', 'holding-pattern', mode)
processFile('../../schemas/travel-document-checkpoint/package.json', 'travel-document-checkpoint', mode)

export function processFile(
    filePath,
    prefix,
    mode
) {
    let rawdata = fs.readFileSync(filePath);
    let packageJson = JSON.parse(rawdata);

    if (mode === 'internal') {
        // Switch to app bundles to prevent duplicate entries for API tokens, Entity classes and additional resources
        packageJson.main = "dist/app/bundle.mjs"
        packageJson.module = "dist/app/bundle.mjs"
        packageJson.types = "dist/app/bundle.d.ts"
    } else if (mode === 'external') {
        // Switch back to client bundles
        packageJson.main = `dist/esm/${prefix}.index.mjs`
        packageJson.module = `dist/esm/${prefix}.index.mjs`
        packageJson.types = `dist/esm/${prefix}.index.d.ts`
    } else {
        throw new Error('Unknown mode: ' + mode)
    }

    fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2));
}
