import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { ApplicationName } from '@airport/ground-control';
import { IDomain, IApplication, IDomainDao, IApplicationDao } from "@airport/airspace";
import { IContext } from '@airport/direction-indicator';
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
    ensureApplications(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
}
export declare class SyncInApplicationChecker implements ISyncInApplicationChecker {
    applicationDao: IApplicationDao;
    domainDao: IDomainDao;
    ensureApplications(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
    private checkApplicationsAndDomains;
    private getNames;
}
//# sourceMappingURL=SyncInApplicationChecker.d.ts.map