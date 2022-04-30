import { ApplicationLocator } from '@airport/landing'
import { ITerminalStore } from '@airport/terminal-map'
import { IApplicationVersion } from '@airport/airspace'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'

@Injected()
export class IFrameApplicationLocator
    extends ApplicationLocator {

    @Inject()
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
