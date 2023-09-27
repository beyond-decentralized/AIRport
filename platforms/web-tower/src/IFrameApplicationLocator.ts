import { ApplicationLocator } from '@airport/takeoff'
import { ITerminalStore } from '@airport/terminal-map'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IApplicationVersion } from '@airport/ground-control'

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
            .getLatestApplicationVersionMapByApplication_FullName()
            .get(fullApplication_Name)

        if (applicationVersion) {
            return applicationVersion
        }

        return await this.transactionalConnector
            .getLatestApplicationVersionMapByApplication_FullName(fullApplication_Name)
    }
}
