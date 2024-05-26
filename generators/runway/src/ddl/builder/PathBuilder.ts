/**
 * Created by Papa on 4/28/2016.
 */

import { dir } from 'console'
import * as fs from 'fs'
import path from 'path'
import { normalizePath } from '../../resolve/pathResolver'
import { Configuration } from '../options/Options'

export class PathBuilder {

	apiDirPath: string
	ddlDirPath: string
	dirExistanceMap: { [path: string]: boolean } = {}
	fullGeneratedDirPath: string
	generatedDirPath: string
	workingDirPath: string
	usePathCache: boolean

	constructor(private configuration: Configuration) {
		this.workingDirPath = normalizePath(process.cwd())
		this.apiDirPath = this.workingDirPath + '/' + normalizePath(configuration.airport.apiDir)
		this.ddlDirPath = this.workingDirPath + '/' + normalizePath(configuration.airport.ddlDir)
		this.generatedDirPath = normalizePath(configuration.airport.generatedDir)
		this.fullGeneratedDirPath = this.workingDirPath + '/' + this.generatedDirPath
		this.usePathCache = configuration.airport.cacheGeneratedPaths ? true : false
	}

	// getOutDirPrefix(fullGenerationPath: string): string {
	// 	let numDirsOut = fullGenerationPath.split('/').length
	// 		- this.workingDirPath.split('/').length
	// 		- this.configuration.airport.generatedDir.split('/').length
	// 		- 1
	//
	// 	let outDirPrefix = '..'
	// 	for (let i = 0 i < numDirsOut i++) {
	// 		outDirPrefix += '/..'
	// 	}
	//
	// 	return outDirPrefix
	// }

	prefixToFileName(
		sourceRelativePath: string,
		prefix
	): string {
		let pathFragments
		if (sourceRelativePath.indexOf(path.sep) > -1) {
			pathFragments = sourceRelativePath.split(path.sep)
		} else if (sourceRelativePath.indexOf(path.posix.sep) > -1) {
			pathFragments = sourceRelativePath.split(path.posix.sep)
		} else {
			pathFragments = [sourceRelativePath]
		}
		let fileName = pathFragments[pathFragments.length - 1]
		fileName = prefix + fileName

		pathFragments[pathFragments.length - 1] = fileName
		sourceRelativePath = pathFragments.join(path.posix.sep)

		return sourceRelativePath
	}

	getFullPathToGeneratedSource( //
		sourcePath: string,
		prefix,
		pathPrefix = ''
	): string {
		let generatedPath = this.getGenerationPathForFile(sourcePath, prefix, this.ddlDirPath, pathPrefix)

		return this.workingDirPath + '/' + generatedPath
	}

	getFullPathToDdlSource( //
		sourcePath: string
	): string {
		return this.getDdlPathForFile(sourcePath)
	}

	setupFileForGeneration(
		sourcePath: string,
		prefix,
		pathPrefix = '',
		dirPath = this.ddlDirPath
	): string {
		let generatedPath = this.getGenerationPathForFile(sourcePath, prefix, dirPath, pathPrefix)
		let genPathFragments = generatedPath.split('/')

		let currentPath = this.workingDirPath
		for (let i = 0; i < genPathFragments.length - 1; i++) {
			currentPath += '/' + genPathFragments[i]
			if (this.usePathCache && this.dirExistanceMap[currentPath]) {
				continue
			}
			let pathExists = fs.existsSync(currentPath)
			if (!pathExists) {
				fs.mkdirSync(currentPath)
			} else {
				let pathStat: fs.Stats = fs.statSync(currentPath)
				if (!pathStat.isDirectory()) {
					throw new Error(`'${currentPath}' 
					is not a directory`)
				}
			}
			this.dirExistanceMap[currentPath] = true
		}

		const pathFragments = generatedPath.split('/')

		return './' + generatedPath
	}

	private getGenerationPathForFile(
		sourcePath: string,
		prefix,
		dirPath,
		pathPrefix
	): string {
		sourcePath = normalizePath(sourcePath)

		let indexOfSourceDirInPath = sourcePath.indexOf(dirPath)
		if (indexOfSourceDirInPath !== 0) {
			throw new Error(`Cannot generate file from source outside of root source dir`)
		}
		let sourceRelativePath = sourcePath.substr(dirPath.length + 1)

		if (prefix) {
			sourceRelativePath = this.prefixToFileName(sourceRelativePath, prefix)
		}

		return this.generatedDirPath + '/' + pathPrefix + (pathPrefix ? '/' : '') + sourceRelativePath
	}

	private getDdlPathForFile(
		sourcePath: string
	): string {
		sourcePath = normalizePath(sourcePath)

		let indexOfSourceDirInPath = sourcePath.indexOf(this.ddlDirPath)
		if (indexOfSourceDirInPath !== 0) {
			throw new Error(`Cannot generate file from source outside of root source dir`)
		}

		return sourcePath
	}

}
