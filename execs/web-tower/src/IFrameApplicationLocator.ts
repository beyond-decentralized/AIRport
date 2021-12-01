import { container, DI } from '@airport/di'
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control'
import { APPLICATION_LOCATOR, ApplicationLocator } from '@airport/landing'
import { ITerminalStore } from '@airport/terminal-map'
import { IApplicationVersion } from '@airport/airspace'
import { AllDdlObjects } from '@airport/takeoff'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

export class IFrameApplicationLocator
    extends ApplicationLocator {

    async locateLatestApplicationVersionByApplicationName(
        applicationName: string,
        terminalStore: ITerminalStore,
    ): Promise<IApplicationVersion> {
        let applicationVersion = terminalStore.getLatestApplicationVersionMapByApplicationName()
            .get(applicationName)

        if (applicationVersion) {
            return applicationVersion
        }

        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector

        return await transactionalConnector.getLatestApplicationVersionMapByApplicationName(applicationName)
    }
}
DI.set(APPLICATION_LOCATOR, IFrameApplicationLocator)
