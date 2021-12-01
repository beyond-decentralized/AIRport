import { BaseApplicationVersionDao, IBaseApplicationVersionDao, IApplicationVersion } from '../generated/generated';
export interface IApplicationVersionDao extends IBaseApplicationVersionDao {
    findAllActiveOrderByApplicationIndexAndId(): Promise<IApplicationVersion[]>;
    findByDomainNamesAndApplicationNames(domainNames: string[], applicationNames: string[]): Promise<IApplicationVersion[]>;
    insert(applicationVersions: IApplicationVersion[]): Promise<void>;
}
export declare class ApplicationVersionDao extends BaseApplicationVersionDao implements IApplicationVersionDao {
    findAllActiveOrderByApplicationIndexAndId(): Promise<IApplicationVersion[]>;
    findByDomainNamesAndApplicationNames(domainNames: string[], applicationNames: string[]): Promise<IApplicationVersion[]>;
    insert(applicationVersions: IApplicationVersion[]): Promise<void>;
}
//# sourceMappingURL=ApplicationVersionDao.d.ts.map