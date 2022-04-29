import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { DOMAIN_RETRIEVER } from '@airport/terminal-map';
export class DomainRetriever {
    async retrieveDomain(domainName, domainNameMapByName, allDomains, newDomains) {
        return domainNameMapByName.get(domainName);
    }
}
DEPENDENCY_INJECTION.set(DOMAIN_RETRIEVER, DomainRetriever);
//# sourceMappingURL=DomainRetriever.js.map