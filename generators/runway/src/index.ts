/**
 * Created by Papa on 4/24/2016.
 */

import * as fs from 'fs';
import { readConfiguration } from './ddl/options/generator';
import { additionalFileProcessors } from './FileProcessor';
import { watchFiles } from './FileWatcher';

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
	
	for(const fileProcessor of additionalFileProcessors) {
		sourceFilePaths = addRootDirPaths(null, fileProcessor.getDir(), sourceFilePaths)
	}

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

export * from './api/builder/ApiBuilder'
export * from './api/builder/ApiIndexBuilder'
export * from './api/parser/ApiGenerator'
export * from './dao/parser/ApplicationQueryGenerator'
export * from './dao/parser/OperationGenerator'
export * from './ddl/builder/application/ApplicationRelationResolver'
export * from './ddl/builder/application/JsonApplicationBuilder'
export * from './ddl/builder/application/SApplication'
export * from './ddl/builder/application/SApplicationBuilder'
export * from './ddl/builder/application/SEntity'
export * from './ddl/builder/application/SProperty'
export * from './ddl/builder/entity/query/IQEntityInterfaceBuilder'
export * from './ddl/builder/entity/query/QColumnBuilder'
export * from './ddl/builder/entity/query/QCoreEntityBuilder'
export * from './ddl/builder/entity/query/QEntityBuilder'
export * from './ddl/builder/entity/query/QEntityFileBuilder'
export * from './ddl/builder/entity/query/QEntityIdBuilder'
export * from './ddl/builder/entity/query/QEntityRelationBuilder'
export * from './ddl/builder/entity/query/QPropertyBuilder'
export * from './ddl/builder/entity/query/QRelationBuilder'
export * from './ddl/builder/entity/query/QTransientBuilder'
export * from './ddl/builder/entity/validate/IVEntityInterfaceBuilder'
export * from './ddl/builder/entity/validate/VCoreEntityBuilder'
export * from './ddl/builder/entity/validate/VEntityBuilder'
export * from './ddl/builder/entity/validate/VEntityFileBuilder'
export * from './ddl/builder/entity/validate/VPropertyBuilder'
export * from './ddl/builder/entity/validate/VRelationBuilder'
export * from './ddl/builder/entity/validate/VTransientBuilder'
export * from './ddl/builder/entity/EntityInterfaceFileBuilder'
export * from './ddl/builder/entity/FileBuilder'
export * from './ddl/builder/entity/IEntityInterfaceBuilder'
export * from './ddl/builder/superclass/MappedSuperclassBuilder'
export * from './ddl/builder/Builder'
export * from './ddl/builder/DaoBuilder'
export * from './ddl/builder/DvoBuilder'
export * from './ddl/builder/EntityMappingBuilder'
export * from './ddl/builder/GeneratedFileListingBuilder'
export * from './ddl/builder/GeneratedSummaryBuilder'
export * from './ddl/builder/ImplementationFileBuilder'
export * from './ddl/builder/PathBuilder'
export * from './ddl/builder/QApplicationBuilder'
export * from './ddl/builder/TokenBuilder'
export * from './ddl/builder/UtilityBuilder'
export * from './ddl/loader/temp/NoOpApplicationBuilder'
export * from './ddl/loader/temp/NoOpSequenceGenerator'
export * from './ddl/loader/temp/NoOpSqlDriver'
export * from './ddl/loader/temp/TempDatabase'
export * from './ddl/loader/ApplicationLoader'
export * from './ddl/loader/DbApplicationBuilder'
export * from './ddl/options/Arguments'
export * from './ddl/options/generator'
export * from './ddl/options/Options'
export * from './ddl/options/parser'
export * from './ddl/parser/DocEntry'
export * from './ddl/parser/EntityCandidate'
export * from './ddl/parser/EntityCandidateRegistry'
export * from './ddl/parser/EntityDefinitionGenerator'
export * from './ddl/parser/FileImports'
export * from './ddl/parser/ImportManager'
export * from './ddl/parser/utils'
export * from './execute/QueryPreparationField'
export * from './interface/parser/InterfaceDetector'
export * from './interface/InterfaceRegistry'
export * from './resolve/pathResolver'
export * from './FileProcessor'
export * from './FileWatcher'
export * from './Logger'
export * from './ParserUtils'
