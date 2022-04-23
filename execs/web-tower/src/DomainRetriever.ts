import { container, DEPENDENCY_INJECTION } from '@airport/direction-indicator'
import {
    DbDomain,
    DomainName,
    TRANSACTIONAL_CONNECTOR
} from '@airport/ground-control'
import {
    DOMAIN_RETRIEVER,
    IDomainRetriever
} from '@airport/terminal-map'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

export class DomainRetriever
    implements IDomainRetriever {

    async retrieveDomain(
        domainName: DomainName,
        domainNameMapByName: Map<string, DbDomain>,
		allDomains: DbDomain[],
		newDomains: DbDomain[]
    ): Promise<DbDomain> {
        let domain = domainNameMapByName.get(domainName)

        if (domain) {
            return domain
        }

        const transactionalConnector = await container(this)
            .get(TRANSACTIONAL_CONNECTOR) as IIframeTransactionalConnector

        domain = await transactionalConnector.retrieveDomain(domainName)

        if (domain) {
            domainNameMapByName.set(domainName, domain)
            allDomains.push(domain)
            newDomains.push(domain)
        }

        return domain
    }

}
DEPENDENCY_INJECTION.set(DOMAIN_RETRIEVER, DomainRetriever)
