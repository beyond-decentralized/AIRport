import { ApplicationLocator } from '@airport/takeoff'
import { ITerminalStore } from '@airport/terminal-map'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { DbApplicationVersion } from '@airport/ground-control'

@Injected()
export class IFrameApplicationLocator
    extends ApplicationLocator {

    @Inject()
    transactionalConnector: IIframeTransactionalConnector

    async locateLatestApplicationVersionByDbApplication_Name(
        fullDbApplication_Name: string,
        terminalStore: ITerminalStore,
    ): Promise<DbApplicationVersion> {
        let applicationVersion = terminalStore
            .getLatestApplicationVersionMapByDbApplication_FullName()
            .get(fullDbApplication_Name)

        if (applicationVersion) {
            return applicationVersion
        }

        return await this.transactionalConnector
            .getLatestApplicationVersionMapByDbApplication_FullName(fullDbApplication_Name)
    }
}
