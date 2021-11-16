import { DomainId, DomainName } from '@airport/ground-control';
import { BaseDomainDao, IBaseDomainDao, IDomain } from '../generated/generated';
export interface IDomainDao extends IBaseDomainDao {
    findByIdIn(domainIds: DomainId[]): Promise<IDomain[]>;
    findMapByNameWithNames(domainNames: DomainName[]): Promise<Map<DomainName, IDomain>>;
    findByName(domainName: DomainName): Promise<IDomain>;
    checkAndInsertIfNeeded(domains: IDomain[]): Promise<void>;
}
export declare class DomainDao extends BaseDomainDao implements IDomainDao {
    findByIdIn(domainIds: DomainId[]): Promise<IDomain[]>;
    findMapByNameWithNames(domainNames: DomainName[]): Promise<Map<DomainName, IDomain>>;
    findByName(name: DomainName): Promise<IDomain>;
    checkAndInsertIfNeeded(domains: IDomain[]): Promise<void>;
}
//# sourceMappingURL=DomainDao.d.ts.map