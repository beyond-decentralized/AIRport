import { DI } from '@airport/di';
import { getSchemaNameFromDomainAndName } from '@airport/ground-control';
import { SCHEMA_LOCATOR } from '../tokens';
export class SchemaLocator {
    // private terminalStore: ITerminalStore
    locateExistingSchemaVersionRecord(jsonSchema, terminalStore) {
        const schemaVersionsForDomainName = terminalStore
            .getLatestSchemaVersionMapByNames().get(jsonSchema.domain);
        if (!schemaVersionsForDomainName) {
            return null;
        }
        const schemaName = getSchemaNameFromDomainAndName(jsonSchema.domain, jsonSchema.name);
        const latestSchemaVersionForSchema = schemaVersionsForDomainName.get(schemaName);
        const jsonSchemaVersion = jsonSchema.versions[0];
        if (latestSchemaVersionForSchema
            && latestSchemaVersionForSchema.integerVersion !== jsonSchemaVersion.integerVersion) {
            throw new Error(`Multiple versions of schemas are not yet supported`);
        }
        return latestSchemaVersionForSchema;
    }
    async locateLatestSchemaVersionBySchemaName(schemaName, terminalStore) {
        return terminalStore.getLatestSchemaVersionMapBySchemaName()
            .get(schemaName);
    }
}
DI.set(SCHEMA_LOCATOR, SchemaLocator);
//# sourceMappingURL=SchemaLocator.js.map