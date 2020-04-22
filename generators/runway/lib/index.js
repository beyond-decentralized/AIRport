"use strict";
/**
 * Created by Papa on 4/24/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const generator_1 = require("./ddl/options/generator");
const FileWatcher_1 = require("./FileWatcher");
const configuration = generator_1.readConfiguration(process.cwd(), process.argv);
globalThis.configuration = configuration;
const ddlDirPath = process.cwd() + '/' + configuration.airport.ddlDir;
let sourceFilePaths = findAllDdlFilePaths(ddlDirPath);
if (configuration.airport.daoDir) {
    const daoDirPath = process.cwd() + '/' + configuration.airport.daoDir;
    const daoSourceFilePaths = findAllDdlFilePaths(daoDirPath);
    sourceFilePaths = [...daoSourceFilePaths, ...sourceFilePaths];
}
function findAllDdlFilePaths(dirPath) {
    const allFileNames = fs.readdirSync(dirPath);
    const containedFilePaths = allFileNames.map(fileName => {
        return dirPath + '/' + fileName;
    });
    let sourceFilePaths = [];
    const subDirectoryPaths = containedFilePaths.filter(filePath => {
        if (fs.lstatSync(filePath).isDirectory()) {
            return true;
        }
        else {
            if (isTsFile(filePath)) {
                sourceFilePaths.push(filePath);
            }
            return false;
        }
    });
    for (const subDirPath of subDirectoryPaths) {
        sourceFilePaths = sourceFilePaths.concat(findAllDdlFilePaths(subDirPath));
    }
    return sourceFilePaths;
}
function isTsFile(fileName) {
    return fileName.substr(fileName.length - 3, 3) === '.ts';
}
// Start the watcher
FileWatcher_1.watchFiles(configuration, {
    module: 6 // ts.ModuleKind.ES2020,
}, sourceFilePaths);
//# sourceMappingURL=index.js.map