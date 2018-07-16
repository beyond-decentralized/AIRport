"use strict";
/**
 * Created by Papa on 4/24/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ts = require("typescript");
const FileWatcher_1 = require("./FileWatcher");
const generator_1 = require("./options/generator");
const configuration = generator_1.readConfiguration(process.cwd(), process.argv);
const ddlDirPath = process.cwd() + '/' + configuration.airport.ddlDir;
const sourceFilePaths = findAllDdlFilePaths(ddlDirPath);
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
    return fileName.substr(fileName.length - 3, 3) === ".ts";
}
// Start the watcher
FileWatcher_1.watchFiles(configuration, {
    module: ts.ModuleKind.CommonJS
}, sourceFilePaths);
//# sourceMappingURL=index.js.map