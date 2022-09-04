import { JsonApplication, Application_Name, IDbApplicationUtils } from '@airport/ground-control';
import { IApplication, IApplicationDao } from '@airport/airspace/dist/app/bundle';
export interface CoreDomainAndApplication_Names {
    domain: string;
    application: string;
}
export interface ExistingApplicationInfo {
    coreDomainAndApplication_NamesByApplication_Name: Map<Application_Name, CoreDomainAndApplication_Names>;
    existingApplicationMapByName: Map<Application_Name, IApplication>;
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
    dbApplicationUtils: IDbApplicationUtils;
    check(jsonApplication: JsonApplication): Promise<void>;
    checkDomain(jsonApplication: JsonApplication): Promise<void>;
    checkDependencies(jsonApplications: JsonApplication[]): Promise<ApplicationReferenceCheckResults>;
    private pruneInGroupReferences;
    private pruneReferencesToExistingApplications;
    private findExistingApplications;
    private hasReferences;
}
//# sourceMappingURL=ApplicationChecker.d.ts.map