import { IContext } from '@airport/direction-indicator';
import { BaseApplicationVersionDao, IBaseApplicationVersionDao, IApplicationVersion } from '../generated/generated';
export interface IApplicationVersionDao extends IBaseApplicationVersionDao {
    findAllActiveOrderByApplication_IndexAndId(): Promise<IApplicationVersion[]>;
    findByDomain_NamesAndApplication_Names(domainNames: string[], applicationNames: string[]): Promise<IApplicationVersion[]>;
    insert(applicationVersions: IApplicationVersion[], context: IContext): Promise<void>;
}
export declare class ApplicationVersionDao extends BaseApplicationVersionDao implements IApplicationVersionDao {
    findAllActiveOrderByApplication_IndexAndId(): Promise<IApplicationVersion[]>;
    findByDomain_NamesAndApplication_Names(domainNames: string[], applicationNames: string[]): Promise<IApplicationVersion[]>;
    insert(applicationVersions: IApplicationVersion[], context: IContext): Promise<void>;
}
//# sourceMappingURL=ApplicationVersionDao.d.ts.map