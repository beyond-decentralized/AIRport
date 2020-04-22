"use strict";
/**
 * Created by Papa on 4/28/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const pathResolver_1 = require("../../resolve/pathResolver");
class PathBuilder {
    constructor(configuration) {
        this.configuration = configuration;
        this.dirExistanceMap = {};
        this.workingDirPath = pathResolver_1.normalizePath(process.cwd());
        this.ddlDirPath = this.workingDirPath + '/' + pathResolver_1.normalizePath(configuration.airport.ddlDir);
        this.generatedDirPath = pathResolver_1.normalizePath(configuration.airport.generatedDir);
        this.fullGeneratedDirPath = this.workingDirPath + '/' + this.generatedDirPath;
        this.usePathCache = configuration.airport.cacheGeneratedPaths ? true : false;
    }
    getOutDirPrefix(fullGenerationPath) {
        let numDirsOut = fullGenerationPath.split('/').length
            - this.workingDirPath.split('/').length
            - this.configuration.airport.generatedDir.split('/').length
            - 1;
        let outDirPrefix = '..';
        for (let i = 0; i < numDirsOut; i++) {
            outDirPrefix += '/..';
        }
        return outDirPrefix;
    }
    prefixQToFileName(sourceRelativePath) {
        let pathFragments = sourceRelativePath.split('/');
        let fileName = pathFragments[pathFragments.length - 1];
        fileName = 'q' + fileName;
        pathFragments[pathFragments.length - 1] = fileName;
        sourceRelativePath = pathFragments.join('/');
        return sourceRelativePath;
    }
    getFullPathToGeneratedSource(//
    sourcePath, prefixQ = true) {
        let generatedPath = this.getGenerationPathForFile(sourcePath, prefixQ);
        return this.workingDirPath + '/' + generatedPath;
    }
    setupFileForGeneration(sourcePath, prefixQ = true) {
        let generatedPath = this.getGenerationPathForFile(sourcePath, prefixQ);
        let genPathFragments = generatedPath.split('/');
        let currentPath = this.workingDirPath;
        for (let i = 0; i < genPathFragments.length - 1; i++) {
            currentPath += '/' + genPathFragments[i];
            if (this.usePathCache && this.dirExistanceMap[currentPath]) {
                continue;
            }
            let pathExists = fs.existsSync(currentPath);
            if (!pathExists) {
                fs.mkdirSync(currentPath);
            }
            else {
                let pathStat = fs.statSync(currentPath);
                if (!pathStat.isDirectory()) {
                    throw new Error(`'${currentPath}' 
					is not a directory`);
                }
            }
            this.dirExistanceMap[currentPath] = true;
        }
        const pathFragments = generatedPath.split('/');
        pathFragments[pathFragments.length - 1] = pathFragments[pathFragments.length - 1].toLowerCase();
        return './' + this.convertFileNameToLowerCase(generatedPath);
    }
    convertFileNameToLowerCase(//
    path //
    ) {
        const pathFragments = path.split('/');
        pathFragments[pathFragments.length - 1] = pathFragments[pathFragments.length - 1].toLowerCase();
        return pathFragments.join('/');
    }
    getGenerationPathForFile(sourcePath, prefixQ = true) {
        sourcePath = pathResolver_1.normalizePath(sourcePath);
        let indexOfSourceDirInPath = sourcePath.toLowerCase().indexOf(this.ddlDirPath.toLowerCase());
        if (indexOfSourceDirInPath !== 0) {
            throw new Error(`Cannot generate file from source outside of root source dir`);
        }
        let sourceRelativePath = sourcePath.substr(this.ddlDirPath.length + 1);
        if (prefixQ) {
            sourceRelativePath = this.prefixQToFileName(sourceRelativePath);
        }
        return this.generatedDirPath + '/' + sourceRelativePath;
    }
}
exports.PathBuilder = PathBuilder;
//# sourceMappingURL=PathBuilder.js.map