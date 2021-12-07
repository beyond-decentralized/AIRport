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
    async findOneByName(name) {
        let d;
        return await this.db.findOne.tree({
            select: {},
            from: [d = Q.Domain],
            where: d.name.equals(name)
        });
    }
    async findByNames(names) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [d = Q.Domain],
            where: d.name.in(names)
        });
    }
    async findByName(name) {
        let d;
        return await this.db.findOne.tree({
            select: {},
            from: [d = Q.Domain],
            where: d.name.equals(name)
        });
    }
    async checkAndInsertIfNeeded(domains) {
        const existingDomains = await this.findByIdIn(domains.map(domain => domain.id));
        const existingDomainMap = new Map();
        for (const existingDomain of existingDomains) {
            existingDomainMap.set(existingDomain.id, existingDomain);
        }
        const newDomains = [];
        for (const domain of domains) {
            if (!existingDomainMap.has(domain.id)) {
                newDomains.push(domain);
            }
        }
        let d;
        const values = [];
        for (const domain of newDomains) {
            values.push([
                domain.id, domain.name
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: d = Q.Domain,
            columns: [
                d.id,
                d.name,
            ],
            values
        });
    }
    async insert(domains) {
        let d;
        const values = [];
        for (const domain of domains) {
            values.push([
                domain.name
            ]);
        }
        const ids = await this.db.insertValuesGenerateIds({
            insertInto: d = Q.Domain,
            columns: [
                d.name
            ],
            values
        });
        for (let i = 0; i < domains.length; i++) {
            let domain = domains[i];
            domain.id = ids[i][0];
        }
    }
}
DI.set(DOMAIN_DAO, DomainDao);
//# sourceMappingURL=DomainDao.js.map