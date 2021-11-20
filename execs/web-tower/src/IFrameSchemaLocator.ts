import { container, DI } from '@airport/di'
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { SCHEMA_LOCATOR, SchemaLocator } from '@airport/landing'
import { ITerminalStore } from '@airport/terminal-map'
import { ISchemaVersion } from '@airport/traffic-pattern'
import { AllDdlObjects } from '@airport/takeoff'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

export class IFrameSchemaLocator
    extends SchemaLocator {

    async locateLatestSchemaVersionBySchemaName(
        schemaName: string,
        terminalStore: ITerminalStore,
    ): Promise<ISchemaVersion> {
        let schemaVersion = terminalStore.getLatestSchemaVersionMapBySchemaName()
            .get(schemaName)

        if (schemaVersion) {
            return schemaVersion
        }

        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector

        return await transactionalConnector.getLatestSchemaVersionMapBySchemaName(schemaName)
    }
}
DI.set(SCHEMA_LOCATOR, IFrameSchemaLocator)