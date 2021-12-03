import { DomainName, JsonApplication, ApplicationIndex, ApplicationName, ApplicationStatus, ApplicationVersionId } from '@airport/ground-control';
import { BaseApplicationDao, IBaseApplicationDao, IApplication } from '../generated/generated';
export interface IApplicationLookupRecord {
    index: number;
    domain: {
        id: number;
        name: string;
    };
    jsonApplication: JsonApplication;
    name: string;
    majorVersion: number;
    minorVersion: number;
    patchVersion: number;
}
export interface IApplicationDao extends IBaseApplicationDao {
    findAllActive(): Promise<IApplication[]>;
    findMapByVersionIds(applicationVersionIds: ApplicationVersionId[]): Promise<Map<ApplicationIndex, IApplication>>;
    findMaxVersionedMapByApplicationAndDomainNames(applicationDomainNames: DomainName[], applicationNames: ApplicationName[]): Promise<Map<DomainName, Map<ApplicationName, IApplicationLookupRecord>>>;
    setStatusByIndexes(indexes: ApplicationIndex[], status: ApplicationStatus): Promise<void>;
    findMapByNames(applicationNames: ApplicationName[]): Promise<Map<ApplicationName, IApplication>>;
    findByDomainNamesAndApplicationNames(domainNames: string[], applicationNames: string[]): Promise<IApplication[]>;
    findByIndex(index: ApplicationIndex): Promise<IApplication>;
    insert(applications: IApplication[]): Promise<void>;
}
export declare class ApplicationDao extends BaseApplicationDao implements IApplicationDao {
    findAllActive(): Promise<IApplication[]>;
    findMapByVersionIds(applicationVersionIds: ApplicationVersionId[]): Promise<Map<ApplicationVersionId, IApplication>>;
    findMaxIndex(): Promise<ApplicationIndex>;
    findMaxVersionedMapByApplicationAndDomainNames(applicationDomainNames: DomainName[], applicationNames: ApplicationName[]): Promise<Map<DomainName, Map<ApplicationName, IApplicationLookupRecord>>>;
    setStatusByIndexes(indexes: ApplicationIndex[], status: ApplicationStatus): Promise<void>;
    findMapByNames(applicationNames: ApplicationName[]): Promise<Map<ApplicationName, IApplication>>;
    findByDomainNamesAndApplicationNames(domainNames: string[], applicationNames: string[]): Promise<IApplication[]>;
    findByIndex(index: ApplicationIndex): Promise<IApplication>;
    insert(applications: IApplication[]): Promise<void>;
}
//# sourceMappingURL=ApplicationDao.d.ts.map