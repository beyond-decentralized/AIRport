/**
 * Created by Papa on 4/28/2016.
 */
import * as fs from 'fs';
import path from 'path';
import { normalizePath } from '../../resolve/pathResolver';
export class PathBuilder {
    constructor(configuration) {
        this.configuration = configuration;
        this.dirExistanceMap = {};
        this.workingDirPath = normalizePath(process.cwd());
        this.ddlDirPath = this.workingDirPath + '/' + normalizePath(configuration.airport.ddlDir);
        this.generatedDirPath = normalizePath(configuration.airport.generatedDir);
        this.fullGeneratedDirPath = this.workingDirPath + '/' + this.generatedDirPath;
        this.usePathCache = configuration.airport.cacheGeneratedPaths ? true : false;
    }
    // getOutDirPrefix(fullGenerationPath: string): string {
    // 	let numDirsOut = fullGenerationPath.split('/').length
    // 		- this.workingDirPath.split('/').length
    // 		- this.configuration.airport.generatedDir.split('/').length
    // 		- 1
    //
    // 	let outDirPrefix = '..'
    // 	for (let i = 0; i < numDirsOut; i++) {
    // 		outDirPrefix += '/..'
    // 	}
    //
    // 	return outDirPrefix
    // }
    prefixToFileName(sourceRelativePath, prefix) {
        let pathFragments;
        if (sourceRelativePath.indexOf(path.sep) > -1) {
            pathFragments = sourceRelativePath.split(path.sep);
        }
        else if (sourceRelativePath.indexOf(path.posix.sep) > -1) {
            pathFragments = sourceRelativePath.split(path.posix.sep);
        }
        else {
            pathFragments = [sourceRelativePath];
        }
        let fileName = pathFragments[pathFragments.length - 1];
        fileName = prefix + fileName;
        pathFragments[pathFragments.length - 1] = fileName;
        sourceRelativePath = pathFragments.join(path.posix.sep);
        return sourceRelativePath;
    }
    getFullPathToGeneratedSource(//
    sourcePath, prefix = 'q') {
        let generatedPath = this.getGenerationPathForFile(sourcePath, prefix);
        return this.workingDirPath + '/' + generatedPath;
    }
    getFullPathToDdlSource(//
    sourcePath) {
        return this.getDdlPathForFile(sourcePath);
    }
    setupFileForGeneration(sourcePath, prefix = 'q') {
        let generatedPath = this.getGenerationPathForFile(sourcePath, prefix);
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
    getGenerationPathForFile(sourcePath, prefix) {
        sourcePath = normalizePath(sourcePath);
        let indexOfSourceDirInPath = sourcePath.toLowerCase().indexOf(this.ddlDirPath.toLowerCase());
        if (indexOfSourceDirInPath !== 0) {
            throw new Error(`Cannot generate file from source outside of root source dir`);
        }
        let sourceRelativePath = sourcePath.substr(this.ddlDirPath.length + 1);
        if (prefix) {
            sourceRelativePath = this.prefixToFileName(sourceRelativePath, prefix);
        }
        return this.generatedDirPath + '/' + sourceRelativePath;
    }
    getDdlPathForFile(sourcePath) {
        sourcePath = normalizePath(sourcePath);
        let indexOfSourceDirInPath = sourcePath.toLowerCase().indexOf(this.ddlDirPath.toLowerCase());
        if (indexOfSourceDirInPath !== 0) {
            throw new Error(`Cannot generate file from source outside of root source dir`);
        }
        return sourcePath;
    }
}
//# sourceMappingURL=PathBuilder.js.map