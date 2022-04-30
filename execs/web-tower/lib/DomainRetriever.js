var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/air-control';
let DomainRetriever = class DomainRetriever {
    async retrieveDomain(domainName, domainNameMapByName, allDomains, newDomains) {
        let domain = domainNameMapByName.get(domainName);
        if (domain) {
            return domain;
        }
        domain = await this.transactionalConnector.retrieveDomain(domainName);
        if (domain) {
            domainNameMapByName.set(domainName, domain);
            allDomains.push(domain);
            newDomains.push(domain);
        }
        return domain;
    }
};
__decorate([
    Inject()
], DomainRetriever.prototype, "transactionalConnector", void 0);
DomainRetriever = __decorate([
    Injected()
], DomainRetriever);
export { DomainRetriever };
//# sourceMappingURL=DomainRetriever.js.map