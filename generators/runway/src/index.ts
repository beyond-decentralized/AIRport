/**
 * Created by Papa on 4/24/2016.
 */

import * as fs from 'fs';
import { readConfiguration } from './ddl/options/generator';
import { watchFiles } from './FileWatcher';

const configuration = readConfiguration(process.cwd(), process.argv);
globalThis.configuration = configuration;

let sourceFilePaths = addRootDirPaths(
	configuration.airport.ddlDir, 'src/ddl', []
)
sourceFilePaths = addRootDirPaths(
	configuration.airport.daoDir, 'src/dao', sourceFilePaths
)
sourceFilePaths = addRootDirPaths(
	null, 'src/api', sourceFilePaths
)

function addRootDirPaths(
	dirNameFromConfig: string,
	defaultDir: string,
	existingSourceFilePaths: string[]
) {
	const dir = dirNameFromConfig ? dirNameFromConfig : defaultDir
	const dirPath = process.cwd() + '/' + dir
	const sourceFilePaths = findAllSourceFilePaths(dirPath);

	return [...existingSourceFilePaths, ...sourceFilePaths]
}

function findAllSourceFilePaths(
	dirPath: string,
): string[] {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath);
	}
	const allFileNames = fs.readdirSync(dirPath);
	const containedFilePaths = allFileNames.map(
		fileName => {
			return dirPath + '/' + fileName;
		});
	let sourceFilePaths = [];
	const subDirectoryPaths = containedFilePaths.filter(
		filePath => {
			if (fs.lstatSync(filePath).isDirectory()) {
				return true;
			} else {
				if (isTsFile(filePath)) {
					sourceFilePaths.push(filePath);
				}
				return false;
			}
		}
	);
	for (const subDirPath of subDirectoryPaths) {
		sourceFilePaths = sourceFilePaths.concat(findAllSourceFilePaths(subDirPath));
	}

	sourceFilePaths = sourceFilePaths.map(sourceFilePath => fs.realpathSync.native(sourceFilePath))

	return sourceFilePaths;
}

function isTsFile(
	fileName: string
): boolean {
	return fileName.substr(fileName.length - 3, 3) === '.ts';
}

export async function generate(): Promise<void> {
	console.log('START AIRport generation')

	try {
		await watchFiles(
			configuration,
			{
				module: 6 // tsc.ModuleKind.ES2020,
			},
			sourceFilePaths
		)
	} catch (e) {
		console.log('ERROR in AIRport generation:')
		console.log(e)
	}

	console.log('DONE AIRport generation')
}
