import { JsonApplication, ApplicationName } from '@airport/ground-control';
import { IApplication, IApplicationDao } from '@airport/airspace';
export interface CoreDomainAndApplicationNames {
    domain: string;
    application: string;
}
export interface ExistingApplicationInfo {
    coreDomainAndApplicationNamesByApplicationName: Map<ApplicationName, CoreDomainAndApplicationNames>;
    existingApplicationMapByName: Map<ApplicationName, IApplication>;
}
export interface ApplicationReferenceCheckResults {
    applicationsWithValidDependencies: JsonApplication[];
    applicationsInNeedOfAdditionalDependencies: JsonApplication[];
    neededDependencies: JsonApplication[];
}
export interface IApplicationChecker {
    check(jsonApplication: JsonApplication): Promise<void>;
    checkDependencies(jsonApplications: JsonApplication[]): Promise<ApplicationReferenceCheckResults>;
}
export declare class ApplicationChecker implements IApplicationChecker {
    applicationDao: IApplicationDao;
    check(jsonApplication: JsonApplication): Promise<void>;
    checkDomain(jsonApplication: JsonApplication): Promise<void>;
    checkDependencies(jsonApplications: JsonApplication[]): Promise<ApplicationReferenceCheckResults>;
    private pruneInGroupReferences;
    private pruneReferencesToExistingApplications;
    private findExistingApplications;
    private hasReferences;
}
//# sourceMappingURL=ApplicationChecker.d.ts.map