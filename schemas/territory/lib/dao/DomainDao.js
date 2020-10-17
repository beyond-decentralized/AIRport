import { DI } from '@airport/di';
import { DOMAIN_DAO } from '../tokens';
import { BaseDomainDao, Q } from '../generated/generated';
export class DomainDao extends BaseDomainDao {
    async findByIdIn(domainIds) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [
                d = Q.Domain
            ],
            where: d.id.in(domainIds)
        });
    }
    async findMapByNameWithNames(domainNames) {
        let d;
        const domains = await this.db.find.tree({
            select: {},
            from: [d = Q.Domain],
            where: d.name.in(domainNames)
        });
        const domainMapByNameWithNames = new Map();
        for (const domain of domains) {
            domainMapByNameWithNames.set(domain.name, domain);
        }
        return domainMapByNameWithNames;
    }
}
DI.set(DOMAIN_DAO, DomainDao);
//# sourceMappingURL=DomainDao.js.map