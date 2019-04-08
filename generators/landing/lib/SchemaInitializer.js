"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const takeoff_1 = require("@airport/takeoff");
const diTokens_1 = require("./diTokens");
class SchemaInitializer {
    constructor() {
        this.queryObjectInitializer = di_1.DI.getP(takeoff_1.QUERY_OBJECT_INITIALIZER);
        this.schemaBuilder = di_1.DI.getP(diTokens_1.SCHEMA_BUILDER);
        this.schemaChecker = di_1.DI.getP(diTokens_1.SCHEMA_CHECKER);
        this.schemaLocator = di_1.DI.getP(diTokens_1.SCHEMA_LOCATOR);
        this.schemaRecorder = di_1.DI.getP(diTokens_1.SCHEMA_RECORDER);
    }
    async initialize(jsonSchemas, checkDependencies = false) {
        const jsonSchemasToInstall = [];
        const schemaChecker = await this.schemaChecker;
        for (const jsonSchema of jsonSchemas) {
            await schemaChecker.check(jsonSchema);
            const existingSchema = (await this.schemaLocator).locateExistingSchemaVersionRecord(jsonSchema);
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
        for (const jsonSchema of schemasWithValidDependencies) {
            await (await this.schemaBuilder).build(jsonSchema);
        }
        const ddlObjects = await (await this.schemaRecorder)
            .record(schemasWithValidDependencies);
        (await this.queryObjectInitializer).generateQObjectsAndPopulateStore(ddlObjects);
    }
}
exports.SchemaInitializer = SchemaInitializer;
di_1.DI.set(diTokens_1.SCHEMA_INITIALIZER, SchemaInitializer);
//# sourceMappingURL=SchemaInitializer.js.map