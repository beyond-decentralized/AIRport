"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ts = require("typescript");
const DaoBuilder_1 = require("./builder/DaoBuilder");
const DuoBuilder_1 = require("./builder/DuoBuilder");
const QEntityFileBuilder_1 = require("./builder/entity/QEntityFileBuilder");
const GeneratedSummaryBuilder_1 = require("./builder/GeneratedSummaryBuilder");
const PathBuilder_1 = require("./builder/PathBuilder");
const QSchemaBuilder_1 = require("./builder/QSchemaBuilder");
const JsonSchemaBuilder_1 = require("./builder/schema/JsonSchemaBuilder");
const MappedSuperclassBuilder_1 = require("./builder/superclass/MappedSuperclassBuilder");
const EntityDefinitionGenerator_1 = require("./parser/EntityDefinitionGenerator");
/**
 * Created by Papa on 3/30/2016.
 */
function watchFiles(configuration, options, rootFileNames) {
    const files = {};
    const pathBuilder = new PathBuilder_1.PathBuilder(configuration);
    // initialize the list of files
    rootFileNames.forEach(fileName => {
        files[fileName] = { version: 0 };
    });
    // Create the language service host to allow the LS to communicate with the host
    const servicesHost = {
        getCompilationSettings: () => options,
        getScriptFileNames: () => rootFileNames,
        getScriptVersion: (fileName) => files[fileName] && files[fileName].version.toString(),
        getScriptSnapshot: (fileName) => {
            if (!fs.existsSync(fileName)) {
                return undefined;
            }
            return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
        },
        getCurrentDirectory: () => process.cwd(),
        getDefaultLibFileName: (options) => ts.getDefaultLibFilePath(options)
    };
    // Create the language service files
    const services = ts.createLanguageService(servicesHost, ts.createDocumentRegistry());
    // First time around, process all files
    processFiles(rootFileNames, options, configuration);
    // Now let's watch the files
    rootFileNames.forEach(fileName => {
        // Add a watch on the file to handle next change
        fs.watchFile(fileName, { persistent: true, interval: 250 }, (curr, prev) => {
            // Check timestamp
            if (+curr.mtime <= +prev.mtime) {
                return;
            }
            // Update the version to signal a change in the file
            files[fileName].version++;
            // process file
            processFiles([fileName], options, configuration);
        });
    });
    function processFiles(rootFileNames, options, configuration) {
        options.target = ts.ScriptTarget.ES5;
        const schemaMapByProjectName = {};
        let entityMapByName = EntityDefinitionGenerator_1.generateEntityDefinitions(rootFileNames, options, configuration, schemaMapByProjectName);
        emitFiles(entityMapByName, configuration, schemaMapByProjectName);
    }
    function emitFiles(entityMapByName, configuration, schemaMapByProjectName) {
        const generatedDirPath = pathBuilder.workingDirPath + '/' + pathBuilder.generatedDirPath;
        const schemaPath = generatedDirPath + '/schema.json';
        const schemaSourcePath = generatedDirPath + '/schema.ts';
        if (!fs.existsSync(generatedDirPath)) {
            fs.mkdirSync(generatedDirPath);
        }
        let schemaString;
        if (fs.existsSync(schemaPath)) {
            schemaString = fs.readFileSync(schemaPath, 'utf8');
        }
        const schemaBuilder = new JsonSchemaBuilder_1.JsonSchemaBuilder(configuration, entityMapByName, schemaString);
        const [schemaJsonString, indexedSchema] = schemaBuilder.build(configuration.airport.domain, schemaMapByProjectName);
        const schemaSourceString = `export const SCHEMA = `
            + schemaJsonString + ';';
        fs.writeFileSync(schemaPath, schemaJsonString);
        fs.writeFileSync(schemaSourcePath, schemaSourceString);
        const entityFileReference = {};
        const generatedSummaryBuilder = new GeneratedSummaryBuilder_1.GeneratedSummaryBuilder(pathBuilder);
        const qSchemaBuilder = new QSchemaBuilder_1.QSchemaBuilder(pathBuilder);
        const daoBuilder = new DaoBuilder_1.DaoBuilder(pathBuilder);
        const duoBuilder = new DuoBuilder_1.DuoBuilder(pathBuilder);
        for (const entityName in entityMapByName) {
            const entity = entityMapByName[entityName];
            const fullGenerationPath = pathBuilder.getFullPathToGeneratedSource(entity.path);
            const entityFileBuilder = new QEntityFileBuilder_1.QEntityFileBuilder(entity, fullGenerationPath, pathBuilder, entityMapByName, configuration, indexedSchema.entityMapByName[entityName]);
            if (!entity.isSuperclass) {
                entityFileReference[entity.docEntry.name] = fullGenerationPath;
            }
            generatedSummaryBuilder.addFileNameAndPaths(entityName, entity.path, fullGenerationPath);
            qSchemaBuilder.addFileNameAndPaths(entityName, entity.path, fullGenerationPath);
            const sIndexedEntity = indexedSchema.entityMapByName[entityName];
            let tableIndex;
            if (sIndexedEntity) {
                tableIndex = sIndexedEntity.entity.tableIndex;
            }
            daoBuilder.addFileNameAndPaths(tableIndex, entityName, entity.path, fullGenerationPath);
            duoBuilder.addFileNameAndPaths(tableIndex, entityName, entity.path, fullGenerationPath);
            const generationPath = pathBuilder.setupFileForGeneration(entity.path);
            const entitySourceString = entityFileBuilder.build();
            fs.writeFileSync(generationPath, entitySourceString);
        }
        fs.writeFileSync(daoBuilder.daoListingFilePath, daoBuilder.build());
        fs.writeFileSync(duoBuilder.daoListingFilePath, duoBuilder.build());
        fs.writeFileSync(qSchemaBuilder.qSchemaFilePath, qSchemaBuilder.build(configuration.airport.domain, indexedSchema.schema.name));
        fs.writeFileSync(generatedSummaryBuilder.generatedListingFilePath, generatedSummaryBuilder.build());
        const mappedSuperclassBuilder = new MappedSuperclassBuilder_1.MappedSuperclassBuilder(configuration, entityMapByName);
        const mappedSuperclassPath = generatedDirPath + '/mappedSuperclass.ts';
        fs.writeFileSync(mappedSuperclassPath, mappedSuperclassBuilder.build());
    }
    function emitFile(fileName) {
        let output = services.getEmitOutput(fileName);
        if (!output.emitSkipped) {
            console.log(`Emitting ${fileName}`);
        }
        else {
            console.log(`Emitting ${fileName} failed`);
            logErrors(fileName);
        }
        output.outputFiles.forEach(o => {
            fs.writeFileSync(o.name, o.text, 'utf8');
        });
    }
    function logErrors(fileName) {
        let allDiagnostics = services.getCompilerOptionsDiagnostics()
            .concat(services.getSyntacticDiagnostics(fileName))
            .concat(services.getSemanticDiagnostics(fileName));
        allDiagnostics.forEach(diagnostic => {
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            if (diagnostic.file) {
                let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
                console.log(`  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            }
            else {
                console.log(`  Error: ${message}`);
            }
        });
    }
}
exports.watchFiles = watchFiles;
//# sourceMappingURL=FileWatcher.js.map