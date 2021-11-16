import { AIRPORT_DATABASE } from '@airport/air-control';
import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { container, DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER } from '@airport/takeoff';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { SCHEMA_BUILDER, SCHEMA_CHECKER, SCHEMA_COMPOSER, SCHEMA_INITIALIZER, SCHEMA_LOCATOR, SCHEMA_RECORDER } from './tokens';
export class SchemaInitializer {
    addNewSchemaVersionsToAll(ddlObjects) {
        for (const schemaVersion of ddlObjects.schemaVersions) {
            ddlObjects.allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
        }
    }
    async hydrate(jsonSchemas, context) {
        const [airDb, queryObjectInitializer, sequenceGenerator] = await this.stage(jsonSchemas, context);
        // Hydrate all DDL objects and Sequences
        const ddlObjects = await queryObjectInitializer.initialize(airDb);
        this.addNewSchemaVersionsToAll(ddlObjects);
        this.setAirDbSchemas(airDb, ddlObjects);
        await sequenceGenerator.initialize();
    }
    /*
     * Initialization scenarios:
     *
     * Brand new install - initialize BLUEPRINT schemas
     * Install new App - initialize New schema (and any new dependency schemas)
     * Reload existing install - hydrate all schemas
     * Reload exiting App - nothing to do
     */
    async initialize(jsonSchemas, existingSchemaMap, context, checkDependencies) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, schemaBuilder, schemaComposer, schemaLocator, schemaRecorder, sequenceGenerator, terminalStore] = await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER, SCHEMA_COMPOSER, SCHEMA_LOCATOR, SCHEMA_RECORDER, SEQUENCE_GENERATOR, TERMINAL_STORE);
        const schemasWithValidDependencies = await this.
            getSchemasWithValidDependencies(jsonSchemas, checkDependencies);
        const newJsonSchemaMap = new Map();
        for (const jsonSchema of jsonSchemas) {
            newJsonSchemaMap.set(getSchemaName(jsonSchema), jsonSchema);
        }
        for (const jsonSchema of schemasWithValidDependencies) {
            await schemaBuilder.build(jsonSchema, existingSchemaMap, newJsonSchemaMap, context);
        }
        const ddlObjects = await schemaComposer.compose(schemasWithValidDependencies, ddlObjectRetriever, schemaLocator, terminalStore);
        this.addNewSchemaVersionsToAll(ddlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        this.setAirDbSchemas(airDb, ddlObjects);
        const newSequences = await schemaBuilder.buildAllSequences(schemasWithValidDependencies, context);
        await sequenceGenerator.initialize(newSequences);
        await schemaRecorder.record(ddlObjects, context);
    }
    async initializeForAIRportApp(jsonSchema) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, schemaComposer, schemaLocator, terminalStore] = await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_COMPOSER, SCHEMA_LOCATOR, TERMINAL_STORE);
        const schemasWithValidDependencies = await this.
            getSchemasWithValidDependencies([jsonSchema], false);
        const ddlObjects = await schemaComposer.compose(schemasWithValidDependencies, ddlObjectRetriever, schemaLocator, terminalStore);
        this.addNewSchemaVersionsToAll(ddlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        this.setAirDbSchemas(airDb, ddlObjects);
    }
    async stage(jsonSchemas, context) {
        const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, queryObjectInitializer, schemaBuilder, schemaComposer, schemaLocator, sequenceGenerator, terminalStore] = await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER, SCHEMA_COMPOSER, SCHEMA_LOCATOR, SEQUENCE_GENERATOR, TERMINAL_STORE);
        // Temporarily Initialize schema DDL objects and Sequences to allow for normal hydration
        const tempDdlObjects = await schemaComposer.compose(jsonSchemas, ddlObjectRetriever, schemaLocator, terminalStore);
        this.addNewSchemaVersionsToAll(tempDdlObjects);
        queryObjectInitializer.generateQObjectsAndPopulateStore(tempDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        this.setAirDbSchemas(airDb, tempDdlObjects);
        const newSequences = await schemaBuilder.stageSequences(jsonSchemas, airDb, context);
        await sequenceGenerator.tempInitialize(newSequences);
        return [airDb, queryObjectInitializer, sequenceGenerator];
    }
    async getSchemasWithValidDependencies(jsonSchemas, checkDependencies) {
        const [schemaChecker, schemaLocator, terminalStore] = await container(this).get(SCHEMA_CHECKER, SCHEMA_LOCATOR, TERMINAL_STORE);
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
        if (checkDependencies) {
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
        return schemasWithValidDependencies;
    }
    setAirDbSchemas(airDb, ddlObjects) {
        for (let schema of ddlObjects.allSchemas) {
            airDb.schemas[schema.index] = schema;
        }
    }
}
DI.set(SCHEMA_INITIALIZER, SchemaInitializer);
//# sourceMappingURL=SchemaInitializer.js.map