import { TerminalMessage } from '@airport/arrivals-n-departures';
import { IApplicationVersion } from '@airport/airspace';
export interface IApplicationVersionCheckRecord {
    found?: boolean;
    applicationName: string;
    applicationVersion?: IApplicationVersion;
    applicationVersionNumber: number;
}
export interface ISyncInApplicationVersionChecker {
    ensureApplicationVersions(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInApplicationVersionChecker implements ISyncInApplicationVersionChecker {
    ensureApplicationVersions(message: TerminalMessage): Promise<boolean>;
    private checkVersionsApplicationsDomains;
    private getNames;
}
//# sourceMappingURL=SyncInApplicationVersionChecker.d.ts.map