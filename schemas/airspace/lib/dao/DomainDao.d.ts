import { IContext } from '@airport/direction-indicator';
import { Domain_LocalId, Domain_Name } from '@airport/ground-control';
import { BaseDomainDao, IBaseDomainDao, IDomain } from '../generated/generated';
export interface IDomainDao extends IBaseDomainDao {
    findByIdIn(domainIds: Domain_LocalId[]): Promise<IDomain[]>;
    findMapByNameWithNames(domainNames: Domain_Name[]): Promise<Map<Domain_Name, IDomain>>;
    findOneByName(domainName: Domain_Name): Promise<IDomain>;
    findByNames(domainNames: Domain_Name[]): Promise<IDomain[]>;
    findByName(domainName: Domain_Name): Promise<IDomain>;
    checkAndInsertIfNeeded(domains: IDomain[], context: IContext): Promise<void>;
    insert(domains: IDomain[]): Promise<void>;
}
export declare class DomainDao extends BaseDomainDao implements IDomainDao {
    findByIdIn(domainIds: Domain_LocalId[]): Promise<IDomain[]>;
    findMapByNameWithNames(domainNames: Domain_Name[]): Promise<Map<Domain_Name, IDomain>>;
    findOneByName(name: Domain_Name): Promise<IDomain>;
    findByNames(names: Domain_Name[]): Promise<IDomain[]>;
    findByName(name: Domain_Name): Promise<IDomain>;
    checkAndInsertIfNeeded(domains: IDomain[], context: IContext): Promise<void>;
    insert(domains: IDomain[]): Promise<void>;
}
//# sourceMappingURL=DomainDao.d.ts.map