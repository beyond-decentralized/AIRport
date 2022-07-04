import { IContext } from '@airport/direction-indicator';
import { Domain_Name, Application_Index, Application_Name, ApplicationStatus, ApplicationVersion_LocalId, FullApplication_Name } from '@airport/ground-control';
import { BaseApplicationDao, IBaseApplicationDao, IApplication } from '../generated/generated';
export interface IApplicationLookupRecord {
    index: number;
    domain: {
        _localId: number;
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
    findMapByVersionIds(applicationVersionIds: ApplicationVersion_LocalId[]): Promise<Map<Application_Index, IApplication>>;
    findMaxVersionedMapByApplicationAndDomain_Names(applicationDomain_Names: Domain_Name[], applicationNames: Application_Name[]): Promise<Map<Domain_Name, Map<Application_Name, IApplicationLookupRecord>>>;
    setStatusByIndexes(indexes: Application_Index[], status: ApplicationStatus): Promise<void>;
    findMapByFullNames(fullApplication_Names: FullApplication_Name[]): Promise<Map<FullApplication_Name, IApplication>>;
    findByDomain_NamesAndApplication_Names(domainNames: string[], applicationNames: string[]): Promise<IApplication[]>;
    findByIndex(index: Application_Index): Promise<IApplication>;
    insert(applications: IApplication[], context: IContext): Promise<void>;
}
export declare class ApplicationDao extends BaseApplicationDao implements IApplicationDao {
    findAllActive(): Promise<IApplication[]>;
    findAllWithJson(): Promise<IApplication[]>;
    findMapByVersionIds(applicationVersionIds: ApplicationVersion_LocalId[]): Promise<Map<ApplicationVersion_LocalId, IApplication>>;
    findMaxIndex(): Promise<Application_Index>;
    findMaxVersionedMapByApplicationAndDomain_Names(applicationDomain_Names: Domain_Name[], applicationNames: Application_Name[]): Promise<Map<Domain_Name, Map<Application_Name, IApplicationLookupRecord>>>;
    setStatusByIndexes(indexes: Application_Index[], status: ApplicationStatus): Promise<void>;
    findMapByFullNames(fullApplication_Names: FullApplication_Name[]): Promise<Map<FullApplication_Name, IApplication>>;
    findByDomain_NamesAndApplication_Names(domainNames: string[], applicationNames: string[]): Promise<IApplication[]>;
    findByIndex(index: Application_Index): Promise<IApplication>;
    insert(applications: IApplication[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationDao.d.ts.map