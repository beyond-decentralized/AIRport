import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { SCHEMA_LOCATOR, SchemaLocator } from '@airport/landing';
export class IFrameSchemaLocator extends SchemaLocator {
    async locateLatestSchemaVersionBySchemaName(schemaName, terminalStore, ddlObjects) {
        let schemaVersion = terminalStore.getLatestSchemaVersionMapBySchemaName()
            .get(schemaName);
        if (schemaVersion) {
            return schemaVersion;
        }
        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR);
        schemaVersion = await transactionalConnector.getLatestSchemaVersionMapBySchemaName(schemaName);
        if (ddlObjects) {
            ddlObjects.allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
        }
        return schemaVersion;
    }
}
DI.set(SCHEMA_LOCATOR, IFrameSchemaLocator);
//# sourceMappingURL=IFrameSchemaLocator.js.map