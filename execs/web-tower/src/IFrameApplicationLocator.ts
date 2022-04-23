import { container, DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { APPLICATION_LOCATOR, ApplicationLocator } from '@airport/landing'
import { ITerminalStore } from '@airport/terminal-map'
import { IApplicationVersion } from '@airport/airspace'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

export class IFrameApplicationLocator
    extends ApplicationLocator {

    async locateLatestApplicationVersionByApplicationName(
        fullApplicationName: string,
        terminalStore: ITerminalStore,
    ): Promise<IApplicationVersion> {
        let applicationVersion = terminalStore.getLatestApplicationVersionMapByFullApplicationName()
            .get(fullApplicationName)

        if (applicationVersion) {
            return applicationVersion
        }

        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector

        return await transactionalConnector.getLatestApplicationVersionMapByFullApplicationName(fullApplicationName)
    }
}
DEPENDENCY_INJECTION.set(APPLICATION_LOCATOR, IFrameApplicationLocator)
