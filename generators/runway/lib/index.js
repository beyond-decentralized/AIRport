/**
 * Created by Papa on 4/24/2016.
 */
import * as fs from 'fs';
import { readConfiguration } from './ddl/options/generator';
import { watchFiles } from './FileWatcher';
const configuration = readConfiguration(process.cwd(), process.argv);
globalThis.configuration = configuration;
const ddlDirPath = process.cwd() + '/' + configuration.airport.ddlDir;
let sourceFilePaths = findAllSourceFilePaths(ddlDirPath);
if (configuration.airport.daoDir) {
    const daoDirPath = process.cwd() + '/' + configuration.airport.daoDir;
    const daoSourceFilePaths = findAllSourceFilePaths(daoDirPath);
    sourceFilePaths = [...daoSourceFilePaths, ...sourceFilePaths];
}
function findAllSourceFilePaths(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
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
        sourceFilePaths = sourceFilePaths.concat(findAllSourceFilePaths(subDirPath));
    }
    return sourceFilePaths;
}
function isTsFile(fileName) {
    return fileName.substr(fileName.length - 3, 3) === '.ts';
}
// Start the watcher
watchFiles(configuration, {
    module: 6 // tsc.ModuleKind.ES2020,
}, sourceFilePaths).then();
//# sourceMappingURL=index.js.map