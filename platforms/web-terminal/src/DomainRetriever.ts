import {
	Injected
} from '@airport/direction-indicator'
import {
    DbDomain,
    Domain_Name
} from '@airport/ground-control'
import {
    IDomainRetriever
} from '@airport/terminal-map'

@Injected()
export class DomainRetriever
    implements IDomainRetriever {

    async retrieveDomain(
        domainName: Domain_Name,
        domainNameMapByName: Map<string, DbDomain>,
        allDomains: DbDomain[],
        newDomains: DbDomain[]
    ): Promise<DbDomain> {
        return domainNameMapByName.get(domainName)
    }

}
