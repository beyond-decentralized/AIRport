"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const takeoff_1 = require("@airport/takeoff");
const diTokens_1 = require("./diTokens");
class SchemaInitializer {
    constructor() {
        di_1.DI.get((queryObjectInitializer, schemaBuilder, schemaChecker, schemaLocator, schemaRecorder) => {
            this.queryObjectInitializer = queryObjectInitializer;
            this.schemaBuilder = schemaBuilder;
            this.schemaChecker = schemaChecker;
            this.schemaLocator = schemaLocator;
            this.schemaRecorder = schemaRecorder;
        }, takeoff_1.QUERY_OBJECT_INITIALIZER, diTokens_1.SCHEMA_BUILDER, diTokens_1.SCHEMA_CHECKER, diTokens_1.SCHEMA_LOCATOR, diTokens_1.SCHEMA_RECORDER);
    }
    async initialize(jsonSchemas) {
        const jsonSchemasToInstall = [];
        for (const jsonSchema of jsonSchemas) {
            await this.schemaChecker.check(jsonSchema);
            const existingSchema = this.schemaLocator.locateExistingSchemaVersionRecord(jsonSchema);
            if (existingSchema) {
                // Nothing needs to be done, we already have this schema version
                continue;
            }
            jsonSchemasToInstall.push(jsonSchema);
        }
        const schemaReferenceCheckResults = await this.schemaChecker
            .checkDependencies(jsonSchemasToInstall);
        if (schemaReferenceCheckResults.neededDependencies.length
            || schemaReferenceCheckResults.schemasInNeedOfAdditionalDependencies.length) {
            throw new Error(`Installing schemas with external dependencies
			is not currently supported.`);
        }
        for (const jsonSchema of schemaReferenceCheckResults.schemasWithValidDependencies) {
            await this.schemaBuilder.build(jsonSchema);
        }
        const ddlObjects = await this.schemaRecorder.record(schemaReferenceCheckResults.schemasWithValidDependencies);
        this.queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects);
    }
}
exports.SchemaInitializer = SchemaInitializer;
di_1.DI.set(diTokens_1.SCHEMA_INITIALIZER, SchemaInitializer);
//# sourceMappingURL=SchemaInitializer.js.map