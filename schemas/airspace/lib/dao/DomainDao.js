var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { BaseDomainDao, Q } from '../generated/generated';
let DomainDao = class DomainDao extends BaseDomainDao {
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
    async checkAndInsertIfNeeded(domains, context) {
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
        if (!newDomains.length) {
            return;
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
        }, context);
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
};
DomainDao = __decorate([
    Injected()
], DomainDao);
export { DomainDao };
//# sourceMappingURL=DomainDao.js.map