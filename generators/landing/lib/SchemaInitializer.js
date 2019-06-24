"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const takeoff_1 = require("@airport/takeoff");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("./diTokens");
class SchemaInitializer {
    async initialize(jsonSchemas, normalOperation = true) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, schemaBuilder, schemaChecker, schemaComposer, schemaLocator, schemaRecorder, sequenceGenerator, terminalStore] = await di_1.DI.get(air_control_1.AIR_DB, takeoff_1.DDL_OBJECT_LINKER, takeoff_1.DDL_OBJECT_RETRIEVER, takeoff_1.QUERY_ENTITY_CLASS_CREATOR, takeoff_1.QUERY_OBJECT_INITIALIZER, diTokens_1.SCHEMA_BUILDER, diTokens_1.SCHEMA_CHECKER, diTokens_1.SCHEMA_COMPOSER, diTokens_1.SCHEMA_LOCATOR, diTokens_1.SCHEMA_RECORDER, check_in_1.SEQUENCE_GENERATOR, terminal_map_1.TERMINAL_STORE);
        const jsonSchemasToInstall = [];
        for (const jsonSchema of jsonSchemas) {
            await schemaChecker.check(jsonSchema);
            const existingSchema = schemaLocator.locateExistingSchemaVersionRecord(jsonSchema, terminalStore);
            if (existingSchema) {
                // Nothing needs to be done, we already have this schema version
                continue;
            }
            jsonSchemasToInstall.push(jsonSchema);
        }
        let schemasWithValidDependencies;
        if (normalOperation) {
            const schemaReferenceCheckResults = await schemaChecker
                .checkDependencies(jsonSchemasToInstall);
            if (schemaReferenceCheckResults.neededDependencies.length
                || schemaReferenceCheckResults.schemasInNeedOfAdditionalDependencies.length) {
                throw new Error(`Installing schemas with external dependencies
			is not currently supported.`);
            }
            schemasWithValidDependencies = schemaReferenceCheckResults.schemasWithValidDependencies;
        }
        else {
            schemasWithValidDependencies = jsonSchemasToInstall;
        }
        for (const jsonSchema of schemasWithValidDependencies) {
            await schemaBuilder.build(jsonSchema);
        }
        const ddlObjects = schemaComposer.compose(schemasWithValidDependencies, ddlObjectRetriever, schemaLocator, terminalStore);
        if (normalOperation) {
            await schemaRecorder.record(ddlObjects, normalOperation);
        }
        this.addNewSchemaVersionsToAll(ddlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        if (!normalOperation) {
            const schemas = [];
            for (let schema of ddlObjects.allSchemas) {
                schemas[schema.index] = schema;
            }
            airDb.schemas = schemas;
            airDb.S = schemas;
        }
        const newSequences = await schemaBuilder.buildAllSequences(schemasWithValidDependencies);
        await sequenceGenerator.init(newSequences);
        if (!normalOperation) {
            await schemaRecorder.record(ddlObjects, normalOperation);
        }
    }
    addNewSchemaVersionsToAll(ddlObjects) {
        for (const schemaVersion of ddlObjects.schemaVersions) {
            ddlObjects.allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
        }
    }
}
exports.SchemaInitializer = SchemaInitializer;
di_1.DI.set(diTokens_1.SCHEMA_INITIALIZER, SchemaInitializer);
//# sourceMappingURL=SchemaInitializer.js.map