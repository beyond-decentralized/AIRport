import { IUtils } from '@airport/air-control';
import { DomainId, DomainName } from '@airport/ground-control';
import { IDomain } from '..';
import { BaseDomainDao, IBaseDomainDao } from '../generated/baseDaos';
export interface IDomainDao extends IBaseDomainDao {
    findByIdIn(domainIds: DomainId[]): Promise<IDomain[]>;
    findMapByNameWithNames(domainNames: DomainName[]): Promise<Map<DomainName, IDomain>>;
}
export declare class DomainDao extends BaseDomainDao implements IDomainDao {
    constructor(utils: IUtils);
    findByIdIn(domainIds: DomainId[]): Promise<IDomain[]>;
    findMapByNameWithNames(domainNames: DomainName[]): Promise<Map<DomainName, IDomain>>;
}
