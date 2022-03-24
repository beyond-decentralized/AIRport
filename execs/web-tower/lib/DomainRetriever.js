import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { DOMAIN_RETRIEVER } from '@airport/terminal-map';
export class DomainRetriever {
    async retrieveDomain(domainName, domainNameMapByName) {
        let domain = domainNameMapByName.get(domainName);
        if (domain) {
            return domain;
        }
        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR);
        domain = await transactionalConnector.retrieveDomain(domainName);
        if (domain) {
            domainNameMapByName.set(domainName, domain);
        }
        return domain;
    }
}
DI.set(DOMAIN_RETRIEVER, DomainRetriever);
//# sourceMappingURL=DomainRetriever.js.map