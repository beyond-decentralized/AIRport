import { AIR_DB } from '@airport/air-control';
import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { container, DI } from '@airport/di';
import { DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER } from '@airport/takeoff';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { SCHEMA_BUILDER, SCHEMA_CHECKER, SCHEMA_COMPOSER, SCHEMA_INITIALIZER, SCHEMA_LOCATOR, SCHEMA_RECORDER } from './tokens';
export class SchemaInitializer {
    async initialize(jsonSchemas, context, normalOperation = true) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, schemaBuilder, schemaChecker, schemaComposer, schemaLocator, schemaRecorder, sequenceGenerator, terminalStore] = await container(this).get(AIR_DB, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER, SCHEMA_CHECKER, SCHEMA_COMPOSER, SCHEMA_LOCATOR, SCHEMA_RECORDER, SEQUENCE_GENERATOR, TERMINAL_STORE);
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
            await schemaBuilder.build(jsonSchema, context);
        }
        const ddlObjects = schemaComposer.compose(schemasWithValidDependencies, ddlObjectRetriever, schemaLocator, terminalStore);
        if (normalOperation) {
            await schemaRecorder.record(ddlObjects, normalOperation);
        }
        this.addNewSchemaVersionsToAll(ddlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        this.setAirDbSchemas(airDb, ddlObjects);
        const newSequences = await schemaBuilder.buildAllSequences(schemasWithValidDependencies, context);
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
    async hydrate(jsonSchemas, context) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, schemaBuilder, schemaChecker, schemaComposer, schemaLocator, schemaRecorder, sequenceGenerator, terminalStore] = await container(this).get(AIR_DB, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER, SCHEMA_CHECKER, SCHEMA_COMPOSER, SCHEMA_LOCATOR, SCHEMA_RECORDER, SEQUENCE_GENERATOR, TERMINAL_STORE);
        // Temporarily Initialize schema DDL objects and Sequences to allow for normal hydration
        const tempDdlObjects = schemaComposer.compose(jsonSchemas, ddlObjectRetriever, schemaLocator, terminalStore);
        this.addNewSchemaVersionsToAll(tempDdlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(tempDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        this.setAirDbSchemas(airDb, tempDdlObjects);
        const newSequences = await schemaBuilder.stageSequences(jsonSchemas, airDb, context);
        await sequenceGenerator.tempInit(newSequences);
        // Hydrate all DDL objects and Sequences
        const ddlObjects = await queryObjectInitializer.initialize(airDb);
        this.addNewSchemaVersionsToAll(ddlObjects);
        this.setAirDbSchemas(airDb, ddlObjects);
        await sequenceGenerator.init();
    }
    setAirDbSchemas(airDb, ddlObjects) {
        for (let schema of ddlObjects.allSchemas) {
            airDb.schemas[schema.index] = schema;
        }
    }
}
DI.set(SCHEMA_INITIALIZER, SchemaInitializer);
//# sourceMappingURL=SchemaInitializer.js.map