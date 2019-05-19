/**
 * Created by Papa on 4/24/2016.
 */

import {ENTITY_MANAGER}    from '@airport/tower'
import * as fs             from 'fs'
import * as ts             from 'typescript'
import {watchFiles}        from './FileWatcher'
import {readConfiguration} from './options/generator'

//
const REF = ENTITY_MANAGER

const configuration = readConfiguration(process.cwd(), process.argv)

const ddlDirPath      = process.cwd() + '/' + configuration.airport.ddlDir
const sourceFilePaths = findAllDdlFilePaths(ddlDirPath)

function findAllDdlFilePaths(
	dirPath: string,
): string[] {
	const allFileNames       = fs.readdirSync(dirPath)
	const containedFilePaths = allFileNames.map(
		fileName => {
			return dirPath + '/' + fileName
		})
	let sourceFilePaths      = []
	const subDirectoryPaths  = containedFilePaths.filter(
		filePath => {
			if (fs.lstatSync(filePath).isDirectory()) {
				return true
			} else {
				if (isTsFile(filePath)) {
					sourceFilePaths.push(filePath)
				}
				return false
			}
		}
	)
	for (const subDirPath of subDirectoryPaths) {
		sourceFilePaths = sourceFilePaths.concat(findAllDdlFilePaths(subDirPath))
	}

	return sourceFilePaths
}

function isTsFile(
	fileName: string
): boolean {
	return fileName.substr(fileName.length - 3, 3) === '.ts'
}

// Start the watcher
watchFiles(
	configuration,
	{
		module: ts.ModuleKind.CommonJS
	},
	sourceFilePaths
)


