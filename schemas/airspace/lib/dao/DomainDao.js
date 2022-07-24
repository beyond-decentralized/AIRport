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
            SELECT: {},
            FROM: [
                d = Q.Domain
            ],
            WHERE: d._localId.IN(domainIds)
        });
    }
    async findMapByNameWithNames(domainNames) {
        let d;
        const domains = await this.db.find.tree({
            SELECT: {},
            FROM: [d = Q.Domain],
            WHERE: d.name.IN(domainNames)
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
            SELECT: {},
            FROM: [d = Q.Domain],
            WHERE: d.name.equals(name)
        });
    }
    async findByNames(names) {
        let d;
        return await this.db.find.tree({
            SELECT: {},
            FROM: [d = Q.Domain],
            WHERE: d.name.IN(names)
        });
    }
    async findByName(name) {
        let d;
        return await this.db.findOne.tree({
            SELECT: {},
            FROM: [d = Q.Domain],
            WHERE: d.name.equals(name)
        });
    }
    async checkAndInsertIfNeeded(domains, context) {
        const existingDomains = await this.findByIdIn(domains.map(domain => domain._localId));
        const existingDomainMap = new Map();
        for (const existingDomain of existingDomains) {
            existingDomainMap.set(existingDomain._localId, existingDomain);
        }
        const newDomains = [];
        for (const domain of domains) {
            if (!existingDomainMap.has(domain._localId)) {
                newDomains.push(domain);
            }
        }
        if (!newDomains.length) {
            return;
        }
        let d;
        const VALUES = [];
        for (const domain of newDomains) {
            VALUES.push([
                domain._localId, domain.name
            ]);
        }
        await this.db.insertValuesGenerateIds({
            INSERT_INTO: d = Q.Domain,
            columns: [
                d._localId,
                d.name,
            ],
            VALUES
        }, context);
    }
    async insert(domains) {
        let d;
        const VALUES = [];
        for (const domain of domains) {
            VALUES.push([
                domain.name
            ]);
        }
        const ids = await this.db.insertValuesGenerateIds({
            INSERT_INTO: d = Q.Domain,
            columns: [
                d.name
            ],
            VALUES
        });
        for (let i = 0; i < domains.length; i++) {
            let domain = domains[i];
            domain._localId = ids[i][0];
        }
    }
};
DomainDao = __decorate([
    Injected()
], DomainDao);
export { DomainDao };
//# sourceMappingURL=DomainDao.js.map