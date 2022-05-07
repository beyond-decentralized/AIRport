import { IDbApplicationUtils, JsonApplication } from '@airport/ground-control';
import { ITerminalStore } from '@airport/terminal-map';
import { IApplicationVersion } from '@airport/airspace';
export interface IApplicationLocator {
    locateExistingApplicationVersionRecord(jsonApplication: JsonApplication, terminalStore: ITerminalStore): IApplicationVersion;
    locateLatestApplicationVersionByApplicationName(fullApplicationName: string, terminalStore: ITerminalStore): Promise<IApplicationVersion>;
}
export declare class ApplicationLocator implements IApplicationLocator {
    dbApplicationUtils: IDbApplicationUtils;
    locateExistingApplicationVersionRecord(jsonApplication: JsonApplication, terminalStore: ITerminalStore): IApplicationVersion;
    locateLatestApplicationVersionByApplicationName(fullApplicationName: string, terminalStore: ITerminalStore): Promise<IApplicationVersion>;
}
//# sourceMappingURL=ApplicationLocator.d.ts.map