"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const takeoff_1 = require("@airport/takeoff");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("./diTokens");
class SchemaInitializer {
    constructor() {
        this.queryObjectInitializer = di_1.DI.getP(takeoff_1.QUERY_OBJECT_INITIALIZER);
        this.schemaBuilder = di_1.DI.getP(diTokens_1.SCHEMA_BUILDER);
        this.schemaChecker = di_1.DI.getP(diTokens_1.SCHEMA_CHECKER);
        this.schemaComposer = di_1.DI.getP(diTokens_1.SCHEMA_COMPOSER);
        this.schemaLocator = di_1.DI.getP(diTokens_1.SCHEMA_LOCATOR);
        this.schemaRecorder = di_1.DI.getP(diTokens_1.SCHEMA_RECORDER);
        this.terminalStore = di_1.DI.getP(terminal_map_1.TERMINAL_STORE);
    }
    async initialize(jsonSchemas, normalOperation = true) {
        const jsonSchemasToInstall = [];
        const schemaChecker = await this.schemaChecker;
        const schemaLocator = await this.schemaLocator;
        for (const jsonSchema of jsonSchemas) {
            await schemaChecker.check(jsonSchema);
            const existingSchema = schemaLocator.locateExistingSchemaVersionRecord(jsonSchema);
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
            await (await this.schemaBuilder).build(jsonSchema);
        }
        const ddlObjects = (await this.schemaComposer).compose(schemasWithValidDependencies, !normalOperation);
        if (normalOperation) {
            await (await this.schemaRecorder).record(ddlObjects, normalOperation);
        }
        this.addNewSchemaVersionsToAll(ddlObjects);
        (await this.queryObjectInitializer).generateQObjectsAndPopulateStore(ddlObjects);
        if (!normalOperation) {
            await (await this.schemaRecorder).record(ddlObjects, normalOperation);
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