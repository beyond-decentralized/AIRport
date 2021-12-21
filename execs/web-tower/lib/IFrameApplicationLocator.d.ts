import { ApplicationLocator } from '@airport/landing';
import { ITerminalStore } from '@airport/terminal-map';
import { IApplicationVersion } from '@airport/airspace';
export declare class IFrameApplicationLocator extends ApplicationLocator {
    locateLatestApplicationVersionByApplicationName(fullApplicationName: string, terminalStore: ITerminalStore): Promise<IApplicationVersion>;
}
//# sourceMappingURL=IFrameApplicationLocator.d.ts.map