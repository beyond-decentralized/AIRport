/**
 * Created by Papa on 4/28/2016.
 */

import * as fs from 'fs';
import path from 'path';
import { normalizePath } from '../../resolve/pathResolver';
import { Configuration } from '../options/Options';

export class PathBuilder {

	dirExistanceMap: { [path: string]: boolean } = {};
	generatedDirPath: string;
	fullGeneratedDirPath: string;
	ddlDirPath: string;
	workingDirPath: string;
	usePathCache: boolean;

	constructor(private configuration: Configuration) {
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

	prefixToFileName(
		sourceRelativePath: string,
		prefix
	): string {
		let pathFragments;
		if (sourceRelativePath.indexOf(path.sep) > -1) {
			pathFragments = sourceRelativePath.split(path.sep);
		} else if (sourceRelativePath.indexOf(path.posix.sep) > -1) {
			pathFragments = sourceRelativePath.split(path.posix.sep);
		} else {
			pathFragments = [sourceRelativePath];
		}
		let fileName = pathFragments[pathFragments.length - 1];
		fileName = prefix + fileName;

		pathFragments[pathFragments.length - 1] = fileName;
		sourceRelativePath = pathFragments.join(path.posix.sep);

		return sourceRelativePath;
	}

	getFullPathToGeneratedSource( //
		sourcePath: string,
		prefix = 'q'
	): string {
		let generatedPath = this.getGenerationPathForFile(sourcePath, prefix);

		return this.workingDirPath + '/' + generatedPath;
	}

	getFullPathToDdlSource( //
		sourcePath: string
	): string {
		return this.getDdlPathForFile(sourcePath);
	}

	setupFileForGeneration(
		sourcePath: string,
		prefix = 'q',
	): string {
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
			} else {
				let pathStat: fs.Stats = fs.statSync(currentPath);
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

	convertFileNameToLowerCase( //
		path: string //
	): string {
		const pathFragments = path.split('/');
		pathFragments[pathFragments.length - 1] = pathFragments[pathFragments.length - 1].toLowerCase();

		return pathFragments.join('/');
	}

	private getGenerationPathForFile(
		sourcePath: string,
		prefix
	): string {
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

	private getDdlPathForFile(
		sourcePath: string
	): string {
		sourcePath = normalizePath(sourcePath)

		let indexOfSourceDirInPath = sourcePath.toLowerCase().indexOf(this.ddlDirPath.toLowerCase())
		if (indexOfSourceDirInPath !== 0) {
			throw new Error(`Cannot generate file from source outside of root source dir`)
		}

		return sourcePath
	}

}
