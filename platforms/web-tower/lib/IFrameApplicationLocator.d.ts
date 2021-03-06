import { ApplicationLocator } from '@airport/landing';
import { ITerminalStore } from '@airport/terminal-map';
import { IApplicationVersion } from '@airport/airspace';
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector';
export declare class IFrameApplicationLocator extends ApplicationLocator {
    transactionalConnector: IIframeTransactionalConnector;
    locateLatestApplicationVersionByApplication_Name(fullApplication_Name: string, terminalStore: ITerminalStore): Promise<IApplicationVersion>;
}
//# sourceMappingURL=IFrameApplicationLocator.d.ts.map