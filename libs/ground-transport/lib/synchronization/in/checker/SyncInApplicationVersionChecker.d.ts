import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IApplicationVersion, IApplicationVersionDao } from '@airport/airspace/lib/to_be_generated/runtime-index';
import { IContext } from '@airport/direction-indicator';
export interface IApplicationVersionCheckRecord {
    found?: boolean;
    applicationName: string;
    applicationVersion?: IApplicationVersion;
    applicationVersionNumber: number;
}
export interface ISyncInApplicationVersionChecker {
    ensureApplicationVersions(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
}
export declare class SyncInApplicationVersionChecker implements ISyncInApplicationVersionChecker {
    applicationVersionDao: IApplicationVersionDao;
    ensureApplicationVersions(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
    private checkVersionsApplicationsDomains;
    private getNames;
}
//# sourceMappingURL=SyncInApplicationVersionChecker.d.ts.map