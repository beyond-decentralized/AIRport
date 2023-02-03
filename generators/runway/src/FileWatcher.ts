import {
	DbApplication,
	DbEntity_LocalId,
	DbApplicationUtils,
} from '@airport/ground-control';
import * as fs from 'fs';
import * as ts from 'typescript';
import tsc from 'typescript';
import { currentApiFileSignatureMap, currentApplicationApi } from './api/parser/ApiGenerator';
import { entityOperationMap } from './dao/parser/OperationGenerator';
import { ApplicationQueryGenerator } from './dao/parser/ApplicationQueryGenerator';
import { DaoBuilder } from './ddl/builder/DaoBuilder';
import { DvoBuilder } from './ddl/builder/DvoBuilder';
import { QEntityFileBuilder } from './ddl/builder/entity/query/QEntityFileBuilder';
import { EntityMappingBuilder } from './ddl/builder/EntityMappingBuilder';
import { GeneratedFileListingBuilder } from './ddl/builder/GeneratedFileListingBuilder';
import { GeneratedSummaryBuilder } from './ddl/builder/GeneratedSummaryBuilder';
import { PathBuilder } from './ddl/builder/PathBuilder';
import { QApplicationBuilder } from './ddl/builder/QApplicationBuilder';
import { JsonApplicationBuilder } from './ddl/builder/application/JsonApplicationBuilder';
import { MappedSuperclassBuilder } from './ddl/builder/superclass/MappedSuperclassBuilder';
import { Configuration } from './ddl/options/Options';
import { EntityCandidate } from './ddl/parser/EntityCandidate';
import { additionalFileProcessors, generateDefinitions } from './FileProcessor';
import { ApiBuilder } from './api/builder/ApiBuilder';
import { ApiIndexBuilder } from './api/builder/ApiIndexBuilder';
import { VEntityFileBuilder } from './ddl/builder/entity/validate/VEntityFileBuilder';
import { IOC } from '@airport/direction-indicator';
import { JsonApplicationChecker } from './ddl/builder/application/JsonApplicationChecker';
import { JsonApplicationWithApi } from '@airport/air-traffic-control';

/**
 * Created by Papa on 3/30/2016.
 */


const applicationQueryGenerator = new ApplicationQueryGenerator();

export async function watchFiles(
	configuration: Configuration,
	options: ts.CompilerOptions,
	rootFileNames: string[],
) {
	const files: { [fileName: string]: { version: number } } = {};

	// initialize the list of files
	rootFileNames.forEach(
		fileName => {
			files[fileName] = { version: 0 };
		});

	// Create the language service host to allow the LS to communicate with the host
	const servicesHost: ts.LanguageServiceHost = {
		readFile: (filename: string, encoding?: string) => {
			try {
				const content = fs.readFileSync(filename, encoding || 'utf8' as any);
				return content as any;
			} catch (e) {
				return '';
			}
		},
		fileExists: (filename: string) => {
			return servicesHost.readFile(filename) !== '';
		},
		getCompilationSettings: () => options,
		getScriptFileNames: () => rootFileNames,
		getScriptVersion: (fileName) => files[fileName] && files[fileName].version.toString(),
		getScriptSnapshot: (fileName) => {
			if (!fs.existsSync(fileName)) {
				return undefined;
			}

			return tsc.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
		},
		getCurrentDirectory: () => process.cwd(),
		getDefaultLibFileName: (options) => tsc.getDefaultLibFilePath(options)
	};

	// Create the language service files
	const languageService = tsc.createLanguageService(servicesHost, tsc.createDocumentRegistry());

	// First time around, process all files
	await processFiles(rootFileNames, options, configuration);

	// Now let's watch the files
	// rootFileNames.forEach(
	// 	fileName => {
	// 		// Add a watch on the file to handle next change
	// 		fs.watchFile(fileName,
	// 			{ persistent: true, interval: 250 },
	// 			(
	// 				curr,
	// 				prev,
	// 			) => {
	// 				// Check timestamp
	// 				if (+curr.mtime <= +prev.mtime) {
	// 					return;
	// 				}

	// 				// Update the version to signal a change in the file
	// 				files[fileName].version++;

	// 				// process file
	// 				processFiles(
	// 					[fileName], options, configuration).then();
	// 			});
	// 	});
}

async function processFiles(
	rootFileNames: string[],
	options: ts.CompilerOptions,
	configuration: Configuration,
): Promise<void> {
	currentApplicationApi.apiObjectMap = {}
	options.target = tsc.ScriptTarget.ES5;
	const applicationMapByProjectName: { [projectName: string]: DbApplication } = {};
	let entityMapByName =
		await generateDefinitions(rootFileNames, options, configuration, applicationMapByProjectName);
	emitFiles(entityMapByName, configuration, applicationMapByProjectName);
}

function emitFiles(
	entityMapByName: { [entityName: string]: EntityCandidate },
	configuration: Configuration,
	applicationMapByProjectName: { [projectName: string]: DbApplication },
): void {
	const pathBuilder = new PathBuilder(configuration);
	const generatedDirPath = pathBuilder.workingDirPath + '/' + pathBuilder.generatedDirPath;
	const applicationPath = generatedDirPath + '/application-spec.json';
	const applicationSourcePath = generatedDirPath + '/application.ts';
	const entityMappingsPath = generatedDirPath + '/entityMappings.ts';

	if (!fs.existsSync(generatedDirPath)) {
		fs.mkdirSync(generatedDirPath);
	}

	const generatedApiDirPath = generatedDirPath + '/api'
	if (!fs.existsSync(generatedApiDirPath)) {
		fs.mkdirSync(generatedApiDirPath);
	}

	let applicationString;
	if (fs.existsSync(applicationPath)) {
		applicationString = fs.readFileSync(applicationPath, 'utf8');
	}

	const applicationBuilder = new JsonApplicationBuilder(
		configuration, entityMapByName, applicationString);
	const [jsonApplication, indexedApplication] =
		applicationBuilder.build(configuration.airport.domain,
			applicationMapByProjectName,
			entityOperationMap);

	const applicationChecker = new JsonApplicationChecker()

	applicationChecker.checkFrameworkReferences(jsonApplication, indexedApplication)

	const applicationFullName = IOC.getSync(DbApplicationUtils).
		getDbApplication_FullNameFromDomainAndName(jsonApplication.domain, jsonApplication.name)

	const entityQInterfaceListingBuilder = new GeneratedFileListingBuilder(pathBuilder, 'qInterfaces.ts');
	const entityVInterfaceListingBuilder = new GeneratedFileListingBuilder(pathBuilder, 'vInterfaces.ts');
	const generatedSummaryBuilder = new GeneratedSummaryBuilder(
		pathBuilder,
		entityQInterfaceListingBuilder,
		entityVInterfaceListingBuilder
	);
	const qApplicationBuilder = new QApplicationBuilder(applicationFullName, pathBuilder, configuration);
	const daoBuilder = new DaoBuilder(applicationFullName, pathBuilder);
	const dvoBuilder = new DvoBuilder(applicationFullName, pathBuilder);
	const entityMappingBuilder = new EntityMappingBuilder(entityMappingsPath, pathBuilder);

	const apiIndexBuilder = new ApiIndexBuilder(pathBuilder)
	let numApiFiles = 0
	for (const apiFilePath in currentApiFileSignatureMap) {
		let apiFileSignature = currentApiFileSignatureMap[apiFilePath]
		if (!apiFileSignature.apiClasses.length) {
			continue
		}
		numApiFiles++
		const apiBuilder = new ApiBuilder(pathBuilder, apiFileSignature, apiFilePath)
		pathBuilder.setupFileForGeneration(apiFilePath, '', 'api/', pathBuilder.apiDirPath);
		fs.writeFileSync(apiBuilder.fullGenerationPath, apiBuilder.build());
		apiIndexBuilder.addApiFilePath(apiBuilder.fullGenerationPath)
	}
	if (numApiFiles) {
		fs.writeFileSync(apiIndexBuilder.fullGenerationPath, apiIndexBuilder.build());
	}

	for (const entityName in entityMapByName) {
		const entity: EntityCandidate = entityMapByName[entityName];

		const fullQGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.path, 'Q', 'query');
		const fullVGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.path, 'V', 'validation');
		const qEntityFileBuilder = new QEntityFileBuilder(entity, fullQGenerationPath, pathBuilder,
			entityMapByName, configuration, indexedApplication.entityMapByName[entityName], entity.path);
		const vEntityFileBuilder = new VEntityFileBuilder(entity, fullVGenerationPath, pathBuilder,
			entityMapByName, configuration, indexedApplication.entityMapByName[entityName], entity.path);

		entityQInterfaceListingBuilder.addFileNameAndPaths(fullQGenerationPath);
		entityVInterfaceListingBuilder.addFileNameAndPaths(fullVGenerationPath);
		qApplicationBuilder.addFileNameAndPaths(entityName, entity.path, fullQGenerationPath,
			entity.docEntry.isMappedSuperclass);

		const sIndexedEntity = indexedApplication.entityMapByName[entityName];

		let entityIndex: DbEntity_LocalId;
		if (sIndexedEntity) {
			entityIndex = sIndexedEntity.entity.entityIndex;
		}
		daoBuilder.addFileNameAndPaths(entityIndex, entityName, entity.path, fullQGenerationPath);
		dvoBuilder.addFileNameAndPaths(entityIndex, entityName, entity.path, fullVGenerationPath);
		entityMappingBuilder.addEntity(entityIndex, entityName, entity.path);
		const qGenerationPath = pathBuilder.setupFileForGeneration(entity.path, 'Q', 'query');
		const vGenerationPath = pathBuilder.setupFileForGeneration(entity.path, 'V', 'validation');
		const qEntitySourceString = qEntityFileBuilder.build();
		const vEntitySourceString = vEntityFileBuilder.build();
		fs.writeFileSync(qGenerationPath, qEntitySourceString);
		fs.writeFileSync(vGenerationPath, vEntitySourceString);
	}
	fs.writeFileSync(daoBuilder.listingFilePath, daoBuilder.build());
	fs.writeFileSync(entityMappingBuilder.entityMappingsPath, entityMappingBuilder.build(configuration.airport.domain, configuration.airport.application));
	fs.writeFileSync(dvoBuilder.listingFilePath, dvoBuilder.build());
	fs.writeFileSync(qApplicationBuilder.qApplicationFilePath, qApplicationBuilder.build(
		configuration.airport.domain,
		indexedApplication.application.name,
	));
	fs.writeFileSync(entityQInterfaceListingBuilder.generatedListingFilePath, entityQInterfaceListingBuilder.build());
	fs.writeFileSync(entityVInterfaceListingBuilder.generatedListingFilePath, entityVInterfaceListingBuilder.build());
	fs.writeFileSync(generatedSummaryBuilder.generatedListingFilePath, generatedSummaryBuilder.build());

	const mappedSuperclassBuilder = new MappedSuperclassBuilder(
		configuration, entityMapByName);

	const mappedSuperclassPath = generatedDirPath + '/mappedSuperclass.ts';
	fs.writeFileSync(mappedSuperclassPath, mappedSuperclassBuilder.build());

	for (const fileProcessor of additionalFileProcessors) {
		fileProcessor.build(pathBuilder, jsonApplication as JsonApplicationWithApi)
	}

	addOperations(jsonApplication as JsonApplicationWithApi, applicationPath,
		applicationSourcePath, applicationBuilder).then();
}

async function addOperations(
	jsonApplication: JsonApplicationWithApi,
	applicationPath: string,
	applicationSourcePath: string,
	applicationBuilder: JsonApplicationBuilder
) {
	await applicationQueryGenerator.processQueries(entityOperationMap, jsonApplication);
	applicationBuilder.addOperations(jsonApplication, entityOperationMap);

	const applicationJsonString = JSON.stringify(jsonApplication, null, '\t');

	const applicationSourceString = `export const APPLICATION = `
		+ applicationJsonString + ';';

	fs.writeFileSync(applicationPath, applicationJsonString);
	fs.writeFileSync(applicationSourcePath, '/* eslint-disable */\n' + applicationSourceString);
}

function emitFile(
	fileName: string,
	languageService: ts.LanguageService
) {
	let output = languageService.getEmitOutput(fileName);

	if (!output.emitSkipped) {
		console.log(`Emitting ${fileName}`);
	} else {
		console.log(`Emitting ${fileName} failed`);
		logErrors(fileName, languageService);
	}

	output.outputFiles.forEach(
		o => {
			fs.writeFileSync(o.name, o.text, 'utf8');
		});
}

function logErrors(
	fileName: string,
	languageService: ts.LanguageService
) {
	let allDiagnostics = languageService.getCompilerOptionsDiagnostics()
		.concat(languageService.getSyntacticDiagnostics(fileName))
		.concat(languageService.getSemanticDiagnostics(fileName));

	allDiagnostics.forEach(
		diagnostic => {
			let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
			if (diagnostic.file) {
				let {
					line,
					character
				} = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
				console.log(`  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
			} else {
				console.log(`  Error: ${message}`);
			}
		});
}
