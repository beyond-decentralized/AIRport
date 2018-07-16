const fs = require("fs");

const projectDir = process.cwd();
const libPath = process.cwd() + '/' + 'lib';

const undesiredReferencePaths = [
    '../apis',
    '../apps',
    '../generators',
    '../libs',
    '../schemas'
];

const pathMap = getProjectPathMap(projectDir);
inspectDirectory(libPath, 0);

function inspectDirectory(path, depth) {
    const allFilesAndDirs = fs.readdirSync(path);
    for(let fileOrDirName of allFilesAndDirs) {
        fileOrDirName = path + '/' + fileOrDirName;
        const stat = fs.statSync(fileOrDirName);
        if (stat.isDirectory()) {
            inspectDirectory(fileOrDirName, depth + 1);
        }
        else if (isJsFile(fileOrDirName)) {
            localizeAirportReferences(fileOrDirName, depth);
        }
    }
}

function isJsFile(fileName) {
    return fileName.substr(fileName.length - 3, 3) === ".js";
}

function localizeAirportReferences(sourceFilePath, depth) {
    const sourceFile = fs.readFileSync(sourceFilePath);
    let sourceString = sourceFile.toString();

    let badReferencePath;
    const hasABadReferencePath = undesiredReferencePaths.some(undesiredReferencePath => {
        if (sourceString.includes(undesiredReferencePath)) {
            badReferencePath = undesiredReferencePath;
            return true;
        }
        return false;
    });
    if (hasABadReferencePath) {
        throw `File '${sourceFilePath}' has an illegal import containing: ${badReferencePath}`;
    }

    let toRootPrefix = '';
    for (let i = 0; i < depth; i++) {
        toRootPrefix += '../';
    }

    for (const modulePath in pathMap) {
        const pathInfo = pathMap[modulePath];
        const localPath = toRootPrefix + pathInfo.localPath;
        sourceString = sourceString.replace(pathInfo.regEx, `require("${localPath}")`);
    }

    fs.writeFileSync(sourceFilePath, sourceString);
}

function getProjectPathMap(projectDir) {
    const tsConfigFilePath = projectDir + '/tsconfig.e2e.json';
    const configFile = fs.readFileSync(tsConfigFilePath);
    const configString = configFile.toString();
    const config = JSON.parse(configString);
    const paths = config.compilerOptions.paths;

    const pathMap = {};
    for (const modulePath in paths) {
        if (modulePath.endsWith('/*')) {
            continue;
        }
        const localPath = paths[modulePath][0];
        pathMap[modulePath] = {
            regEx: new RegExp(`require\\("${modulePath}"\\)`, 'g'),
            localPath: localPath + '/index'
        };
    }

    return pathMap;
}