import { IApplication } from '..';
import { BaseApplicationDao, IBaseApplicationDao } from '../generated/baseDaos';
export interface IApplicationDao extends IBaseApplicationDao {
    findByDomainNameAndName(domainName: string, name: string): Promise<IApplication>;
}
export declare class ApplicationDao extends BaseApplicationDao implements IApplicationDao {
    findByDomainNameAndName(domainName: string, name: string): Promise<IApplication>;
}
//# sourceMappingURL=ApplicationDao.d.ts.map