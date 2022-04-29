import {
    DbDomain,
    DomainName
} from '@airport/ground-control'
import {
    IDomainRetriever
} from '@airport/terminal-map'
import { IIframeTransactionalConnector } from './IFrameTransactionalConnector'

export class DomainRetriever
    implements IDomainRetriever {

    transactionalConnector: IIframeTransactionalConnector

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

        domain = await this.transactionalConnector.retrieveDomain(domainName)

        if (domain) {
            domainNameMapByName.set(domainName, domain)
            allDomains.push(domain)
            newDomains.push(domain)
        }

        return domain
    }

}
