import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { ApplicationName } from '@airport/ground-control';
import { IDomain, IApplication } from "@airport/airspace";
export interface IDomainCheckRecord {
    domain?: IDomain;
    domainName: string;
    found?: boolean;
}
export interface IApplicationCheckRecord {
    found?: boolean;
    applicationName: ApplicationName;
    application?: IApplication;
}
export interface ISyncInApplicationChecker {
    ensureApplications(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInApplicationChecker implements ISyncInApplicationChecker {
    ensureApplications(message: RepositorySynchronizationMessage): Promise<boolean>;
    private checkApplicationsAndDomains;
    private getNames;
}
//# sourceMappingURL=SyncInApplicationChecker.d.ts.map