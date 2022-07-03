import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
    DbDomain,
    Domain_Name
} from '@airport/ground-control'
import {
    IDomainRetriever
} from '@airport/terminal-map'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

@Injected()
export class DomainRetriever
    implements IDomainRetriever {

    @Inject()
    transactionalConnector: IIframeTransactionalConnector

    async retrieveDomain(
        domainName: Domain_Name,
        domainNameMapByName: Map<string, DbDomain>,
        allDomains: DbDomain[],
        newDomains: DbDomain[]
    ): Promise<DbDomain> {
        let domain = domainNameMapByName.get(domainName)

        if (domain) {
            return domain
        }

        domain = await this.transactionalConnector.retrieveDomain(domainName)

        if (domain) {
            domainNameMapByName.set(domainName, domain)
            allDomains.push(domain)
            newDomains.push(domain)
        }

        return domain
    }

}
