/**
 * Created by Papa on 4/28/2016.
 */

import * as fs         from 'fs'
import {Configuration} from '../options/Options'
import {normalizePath} from '../../resolve/pathResolver'

export class PathBuilder {

	dirExistanceMap: { [path: string]: boolean } = {}
	generatedDirPath: string
	fullGeneratedDirPath: string
	ddlDirPath: string
	workingDirPath: string
	usePathCache: boolean


	constructor(private configuration: Configuration) {
		this.workingDirPath       = normalizePath(process.cwd())
		this.ddlDirPath           = this.workingDirPath + '/' + normalizePath(configuration.airport.ddlDir)
		this.generatedDirPath     = normalizePath(configuration.airport.generatedDir)
		this.fullGeneratedDirPath = this.workingDirPath + '/' + this.generatedDirPath
		this.usePathCache         = configuration.airport.cacheGeneratedPaths ? true : false
	}

	getOutDirPrefix(fullGenerationPath: string): string {
		let numDirsOut = fullGenerationPath.split('/').length
			- this.workingDirPath.split('/').length
			- this.configuration.airport.generatedDir.split('/').length
			- 1

		let outDirPrefix = '..'
		for (let i = 0; i < numDirsOut; i++) {
			outDirPrefix += '/..'
		}

		return outDirPrefix
	}

	prefixQToFileName(sourceRelativePath: string): string {
		let pathFragments = sourceRelativePath.split('/')
		let fileName      = pathFragments[pathFragments.length - 1]
		fileName          = 'q' + fileName

		pathFragments[pathFragments.length - 1] = fileName
		sourceRelativePath                      = pathFragments.join('/')

		return sourceRelativePath
	}

	getFullPathToGeneratedSource( //
		sourcePath: string,
		prefixQ = true
	): string {
		let generatedPath = this.getGenerationPathForFile(sourcePath, prefixQ)

		return this.workingDirPath + '/' + generatedPath
	}

	setupFileForGeneration(
		sourcePath: string,
		prefixQ = true,
	): string {
		let generatedPath    = this.getGenerationPathForFile(sourcePath, prefixQ)
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

		const pathFragments                     = generatedPath.split('/')
		pathFragments[pathFragments.length - 1] = pathFragments[pathFragments.length - 1].toLowerCase()

		return './' + this.convertFileNameToLowerCase(generatedPath)
	}

	convertFileNameToLowerCase( //
		path: string //
	): string {
		const pathFragments                     = path.split('/')
		pathFragments[pathFragments.length - 1] = pathFragments[pathFragments.length - 1].toLowerCase()

		return pathFragments.join('/')
	}

	private getGenerationPathForFile(
		sourcePath: string,
		prefixQ = true
	): string {
		sourcePath = normalizePath(sourcePath)

		let indexOfSourceDirInPath = sourcePath.toLowerCase().indexOf(this.ddlDirPath.toLowerCase())
		if (indexOfSourceDirInPath !== 0) {
			throw new Error(`Cannot generate file from source outside of root source dir`)
		}
		let sourceRelativePath = sourcePath.substr(this.ddlDirPath.length + 1)

		if (prefixQ) {
			sourceRelativePath = this.prefixQToFileName(sourceRelativePath)
		}

		return this.generatedDirPath + '/' + sourceRelativePath
	}

}
