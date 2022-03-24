import { DI } from '@airport/di';
import { DOMAIN_RETRIEVER } from '@airport/terminal-map';
export class DomainRetriever {
    async retrieveDomain(domainName, domainNameMapByName, allDomains, newDomains) {
        return domainNameMapByName.get(domainName);
    }
}
DI.set(DOMAIN_RETRIEVER, DomainRetriever);
//# sourceMappingURL=DomainRetriever.js.map