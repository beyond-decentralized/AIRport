import { TerminalMessage } from "@airport/arrivals-n-departures";
import { IDomain, IApplication } from "@airport/airspace";
export interface IDomainCheckRecord {
    domain?: IDomain;
    domainName: string;
    found?: boolean;
}
export interface IApplicationCheckRecord {
    found?: boolean;
    applicationName: string;
    application?: IApplication;
}
export interface ISyncInApplicationChecker {
    ensureApplications(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInApplicationChecker implements ISyncInApplicationChecker {
    ensureApplications(message: TerminalMessage): Promise<boolean>;
    private checkApplicationsAndDomains;
    private getNames;
}
//# sourceMappingURL=SyncInApplicationChecker.d.ts.map