import { DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import { APPLICATION_LOCATOR, ApplicationLocator } from '@airport/landing'
import { ITerminalStore } from '@airport/terminal-map'
import { IApplicationVersion } from '@airport/airspace'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

export class IFrameApplicationLocator
    extends ApplicationLocator {

    transactionalConnector: IIframeTransactionalConnector

    async locateLatestApplicationVersionByApplicationName(
        fullApplicationName: string,
        terminalStore: ITerminalStore,
    ): Promise<IApplicationVersion> {
        let applicationVersion = terminalStore
            .getLatestApplicationVersionMapByFullApplicationName()
            .get(fullApplicationName)

        if (applicationVersion) {
            return applicationVersion
        }

        return await this.transactionalConnector
            .getLatestApplicationVersionMapByFullApplicationName(fullApplicationName)
    }
}
DEPENDENCY_INJECTION.set(APPLICATION_LOCATOR, IFrameApplicationLocator)
