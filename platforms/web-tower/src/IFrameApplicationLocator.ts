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

    async locateLatestApplicationVersionByApplication_Name(
        fullApplication_Name: string,
        terminalStore: ITerminalStore,
    ): Promise<IApplicationVersion> {
        let applicationVersion = terminalStore
            .getLatestApplicationVersionMapByFullApplication_Name()
            .get(fullApplication_Name)

        if (applicationVersion) {
            return applicationVersion
        }

        return await this.transactionalConnector
            .getLatestApplicationVersionMapByFullApplication_Name(fullApplication_Name)
    }
}
