import {
	DbApplication,
	EntityId,
} from '@airport/ground-control';
import {
	JsonApplicationWithApi
} from '@airport/check-in'
import { AirportDatabase } from '@airport/tower';
import * as fs from 'fs';
import * as ts from 'typescript';
import tsc from 'typescript';
import { currentApiFileSignatures, currentApplicationApi } from './api/parser/ApiGenerator';
import { entityOperationMap } from './dao/parser/OperationGenerator';
import { ApplicationQueryGenerator } from './dao/parser/ApplicationQueryGenerator';
import { DaoBuilder } from './ddl/builder/DaoBuilder';
import { DuoBuilder } from './ddl/builder/DuoBuilder';
import { EntityInterfaceFileBuilder } from './ddl/builder/entity/EntityInterfaceFileBuilder';
import { QEntityFileBuilder } from './ddl/builder/entity/QEntityFileBuilder';
import { EntityMappingBuilder } from './ddl/builder/EntityMappingBuilder';
import { GeneratedFileListingBuilder } from './ddl/builder/GeneratedFileListingBuilder';
import { GeneratedSummaryBuilder } from './ddl/builder/GeneratedSummaryBuilder';
import { PathBuilder } from './ddl/builder/PathBuilder';
import { QApplicationBuilder } from './ddl/builder/QApplicationBuilder';
import { JsonApplicationBuilder } from './ddl/builder/application/JsonApplicationBuilder';
import { MappedSuperclassBuilder } from './ddl/builder/superclass/MappedSuperclassBuilder';
import { Configuration } from './ddl/options/Options';
import { EntityCandidate } from './ddl/parser/EntityCandidate';
import { generateDefinitions } from './FileProcessor';
import { ApiBuilder } from './ddl/builder/ApiBuilder';
import { ApiIndexBuilder } from './ddl/builder/ApiIndexBuilder';

// TODO: figure out if this is needed
(AirportDatabase as any).bogus = 'loaded for application generation';

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
	const pathBuilder = new PathBuilder(configuration);

	// initialize the list of files
	rootFileNames.forEach(
		fileName => {
			files[fileName] = { version: 0 };
		});

	// Create the language service host to allow the LS to communicate with the host
	const servicesHost: ts.LanguageServiceHost = {
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
		getDefaultLibFileName: (options) => tsc.getDefaultLibFilePath(options),
	};

	// Create the language service files
	const services = tsc.createLanguageService(servicesHost, tsc.createDocumentRegistry());

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

		const entityFileReference: { [entityName: string]: string } = {};

		const generatedSummaryBuilder = new GeneratedSummaryBuilder(pathBuilder);
		const entityInterfaceListingBuilder = new GeneratedFileListingBuilder(pathBuilder, 'interfaces.ts');
		const entityQInterfaceListingBuilder = new GeneratedFileListingBuilder(pathBuilder, 'qInterfaces.ts');
		const qApplicationBuilder = new QApplicationBuilder(pathBuilder, configuration);
		const daoBuilder = new DaoBuilder(pathBuilder);
		const duoBuilder = new DuoBuilder(pathBuilder);
		const entityMappingBuilder = new EntityMappingBuilder(entityMappingsPath, pathBuilder);

		if (currentApiFileSignatures.length) {
			const apiIndexBuilder = new ApiIndexBuilder(pathBuilder)
			for (const apiFileSignature of currentApiFileSignatures) {
				const apiBuilder = new ApiBuilder(pathBuilder, apiFileSignature)
				fs.writeFileSync(apiBuilder.fullGenerationPath, apiBuilder.build());
				apiIndexBuilder.addApiFilePath(apiBuilder.fullGenerationPath)
			}
			fs.writeFileSync(apiIndexBuilder.fullGenerationPath, apiIndexBuilder.build());
		}

		for (const entityName in entityMapByName) {
			const entity: EntityCandidate = entityMapByName[entityName];

			const fullGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.path, false);
			const fullQGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.path);
			const qEntityFileBuilder = new QEntityFileBuilder(entity, fullGenerationPath, pathBuilder,
				entityMapByName, configuration, indexedApplication.entityMapByName[entityName], entity.path);
			const entityInterfaceFileBuilder = new EntityInterfaceFileBuilder(entity, fullGenerationPath, pathBuilder,
				entityMapByName, configuration, indexedApplication.entityMapByName[entityName]);

			if (!entity.isSuperclass) {
				entityFileReference[entity.docEntry.name] = fullGenerationPath;
			}
			entityInterfaceListingBuilder.addFileNameAndPaths(entityName, entity.path, fullGenerationPath);
			entityQInterfaceListingBuilder.addFileNameAndPaths(entityName, entity.path, fullQGenerationPath);
			qApplicationBuilder.addFileNameAndPaths(entityName, entity.path, fullQGenerationPath,
				entity.docEntry.isMappedSuperclass);

			const sIndexedEntity = indexedApplication.entityMapByName[entityName];

			let tableIndex: EntityId;
			if (sIndexedEntity) {
				tableIndex = sIndexedEntity.entity.tableIndex;
			}
			daoBuilder.addFileNameAndPaths(tableIndex, entityName, entity.path, fullGenerationPath);
			duoBuilder.addFileNameAndPaths(tableIndex, entityName, entity.path, fullGenerationPath);
			entityMappingBuilder.addEntity(tableIndex, entityName, entity.path);
			const qGenerationPath = pathBuilder.setupFileForGeneration(entity.path);
			const generationPath = pathBuilder.setupFileForGeneration(entity.path, false);
			const qEntitySourceString = qEntityFileBuilder.build();
			fs.writeFileSync(qGenerationPath, qEntitySourceString);
			const entityInterfaceSourceString = entityInterfaceFileBuilder.build();
			fs.writeFileSync(generationPath, entityInterfaceSourceString);
		}
		fs.writeFileSync(daoBuilder.daoListingFilePath, daoBuilder.build());
		fs.writeFileSync(entityMappingBuilder.entityMappingsPath, entityMappingBuilder.build(configuration.airport.domain, configuration.airport.application));
		fs.writeFileSync(duoBuilder.daoListingFilePath, duoBuilder.build());
		fs.writeFileSync(qApplicationBuilder.qApplicationFilePath, qApplicationBuilder.build(
			configuration.airport.domain,
			indexedApplication.application.name,
		));
		fs.writeFileSync(entityInterfaceListingBuilder.generatedListingFilePath, entityInterfaceListingBuilder.build());
		fs.writeFileSync(entityQInterfaceListingBuilder.generatedListingFilePath, entityQInterfaceListingBuilder.build());
		fs.writeFileSync(generatedSummaryBuilder.generatedListingFilePath, generatedSummaryBuilder.build());

		const mappedSuperclassBuilder = new MappedSuperclassBuilder(
			configuration, entityMapByName);

		const mappedSuperclassPath = generatedDirPath + '/mappedSuperclass.ts';
		fs.writeFileSync(mappedSuperclassPath, mappedSuperclassBuilder.build());

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
	) {
		let output = services.getEmitOutput(fileName);

		if (!output.emitSkipped) {
			console.log(`Emitting ${fileName}`);
		} else {
			console.log(`Emitting ${fileName} failed`);
			logErrors(fileName);
		}

		output.outputFiles.forEach(
			o => {
				fs.writeFileSync(o.name, o.text, 'utf8');
			});
	}

	function logErrors(
		fileName: string,
	) {
		let allDiagnostics = services.getCompilerOptionsDiagnostics()
			.concat(services.getSyntacticDiagnostics(fileName))
			.concat(services.getSemanticDiagnostics(fileName));

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
}
