import { DomainId, DomainName } from '@airport/ground-control';
import { BaseDomainDao, IBaseDomainDao, IDomain } from '../generated/generated';
export interface IDomainDao extends IBaseDomainDao {
    findByIdIn(domainIds: DomainId[]): Promise<IDomain[]>;
    findMapByNameWithNames(domainNames: DomainName[]): Promise<Map<DomainName, IDomain>>;
    findOneByName(domainName: DomainName): Promise<IDomain>;
    findByNames(domainNames: DomainName[]): Promise<IDomain[]>;
    checkAndInsertIfNeeded(domains: IDomain[]): Promise<void>;
    insert(domains: IDomain[]): Promise<void>;
}
export declare class DomainDao extends BaseDomainDao implements IDomainDao {
    findByIdIn(domainIds: DomainId[]): Promise<IDomain[]>;
    findMapByNameWithNames(domainNames: DomainName[]): Promise<Map<DomainName, IDomain>>;
    findOneByName(name: DomainName): Promise<IDomain>;
    findByNames(names: DomainName[]): Promise<IDomain[]>;
    checkAndInsertIfNeeded(domains: IDomain[]): Promise<void>;
    insert(domains: IDomain[]): Promise<void>;
}
//# sourceMappingURL=DomainDao.d.ts.map