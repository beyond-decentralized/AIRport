"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
class SchemaLocator {
    constructor() {
        di_1.DI.get((terminalStore) => {
            this.terminalStore = terminalStore;
        }, terminal_map_1.TERMINAL_STORE);
    }
    locateExistingSchemaVersionRecord(jsonSchema) {
        const schemaVersionsForDomainName = this.terminalStore
            .getLatestSchemaVersionMapByNames().get(jsonSchema.domain);
        if (!schemaVersionsForDomainName) {
            return null;
        }
        const latestSchemaVersionForSchema = schemaVersionsForDomainName.get(jsonSchema.name);
        const jsonSchemaVersion = jsonSchema.versions[0];
        if (latestSchemaVersionForSchema.integerVersion !== jsonSchemaVersion.integerVersion) {
            throw new Error(`Multiple versions of schemas are not yet supported`);
        }
        return latestSchemaVersionForSchema;
    }
    locateLatestSchemaVersionBySchemaName(schemaName) {
        return this.terminalStore.getLatestSchemaVersionMapBySchemaName()
            .get(schemaName);
    }
}
exports.SchemaLocator = SchemaLocator;
di_1.DI.set(diTokens_1.SCHEMA_LOCATOR, SchemaLocator);
//# sourceMappingURL=SchemaLocator.js.map