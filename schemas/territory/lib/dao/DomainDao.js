"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const baseDaos_1 = require("../generated/baseDaos");
const qschema_1 = require("../generated/qschema");
const InjectionTokens_1 = require("../InjectionTokens");
class DomainDao extends baseDaos_1.BaseDomainDao {
    async findByIdIn(domainIds) {
        let d;
        return await this.db.find.tree({
            select: {},
            from: [
                d = qschema_1.Q.Domain
            ],
            where: d.id.in(domainIds)
        });
    }
    async findMapByNameWithNames(domainNames) {
        let d;
        const domains = await this.db.find.tree({
            select: {},
            from: [d = qschema_1.Q.Domain],
            where: d.name.in(domainNames)
        });
        const domainMapByNameWithNames = new Map();
        for (const domain of domains) {
            domainMapByNameWithNames.set(domain.name, domain);
        }
        return domainMapByNameWithNames;
    }
}
exports.DomainDao = DomainDao;
di_1.DI.set(InjectionTokens_1.DOMAIN_DAO, DomainDao);
//# sourceMappingURL=DomainDao.js.map