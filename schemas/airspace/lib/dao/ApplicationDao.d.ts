import { DomainName, ApplicationIndex, ApplicationName, ApplicationStatus, ApplicationVersionId, FullApplicationName } from '@airport/ground-control';
import { BaseApplicationDao, IBaseApplicationDao, IApplication } from '../generated/generated';
export interface IApplicationLookupRecord {
    index: number;
    domain: {
        id: number;
        name: string;
    };
    name: string;
    majorVersion: number;
    minorVersion: number;
    patchVersion: number;
}
export interface IApplicationDao extends IBaseApplicationDao {
    findAllActive(): Promise<IApplication[]>;
    findAllWithJson(): Promise<IApplication[]>;
    findMapByVersionIds(applicationVersionIds: ApplicationVersionId[]): Promise<Map<ApplicationIndex, IApplication>>;
    findMaxVersionedMapByApplicationAndDomainNames(applicationDomainNames: DomainName[], applicationNames: ApplicationName[]): Promise<Map<DomainName, Map<ApplicationName, IApplicationLookupRecord>>>;
    setStatusByIndexes(indexes: ApplicationIndex[], status: ApplicationStatus): Promise<void>;
    findMapByFullNames(fullApplicationNames: FullApplicationName[]): Promise<Map<FullApplicationName, IApplication>>;
    findByDomainNamesAndApplicationNames(domainNames: string[], applicationNames: string[]): Promise<IApplication[]>;
    findByIndex(index: ApplicationIndex): Promise<IApplication>;
    insert(applications: IApplication[]): Promise<void>;
}
export declare class ApplicationDao extends BaseApplicationDao implements IApplicationDao {
    findAllActive(): Promise<IApplication[]>;
    findAllWithJson(): Promise<IApplication[]>;
    findMapByVersionIds(applicationVersionIds: ApplicationVersionId[]): Promise<Map<ApplicationVersionId, IApplication>>;
    findMaxIndex(): Promise<ApplicationIndex>;
    findMaxVersionedMapByApplicationAndDomainNames(applicationDomainNames: DomainName[], applicationNames: ApplicationName[]): Promise<Map<DomainName, Map<ApplicationName, IApplicationLookupRecord>>>;
    setStatusByIndexes(indexes: ApplicationIndex[], status: ApplicationStatus): Promise<void>;
    findMapByFullNames(fullApplicationNames: FullApplicationName[]): Promise<Map<FullApplicationName, IApplication>>;
    findByDomainNamesAndApplicationNames(domainNames: string[], applicationNames: string[]): Promise<IApplication[]>;
    findByIndex(index: ApplicationIndex): Promise<IApplication>;
    insert(applications: IApplication[]): Promise<void>;
}
//# sourceMappingURL=ApplicationDao.d.ts.map