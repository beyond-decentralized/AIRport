import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { SCHEMA_LOCATOR, SchemaLocator } from '@airport/landing';
export class IFrameSchemaLocator extends SchemaLocator {
    async locateLatestSchemaVersionBySchemaName(schemaName, terminalStore) {
        let schemaVersion = terminalStore.getLatestSchemaVersionMapBySchemaName()
            .get(schemaName);
        if (schemaVersion) {
            return schemaVersion;
        }
        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR);
        return await transactionalConnector.getLatestSchemaVersionMapBySchemaName(schemaName);
    }
}
DI.set(SCHEMA_LOCATOR, IFrameSchemaLocator);
//# sourceMappingURL=IFrameSchemaLocator.js.map