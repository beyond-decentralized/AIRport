import {
	Injected
} from '@airport/direction-indicator'
import {
    IDomain,
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
        domainNameMapByName: Map<string, IDomain>,
        allDomains: IDomain[],
        newDomains: IDomain[]
    ): Promise<IDomain> {
        return domainNameMapByName.get(domainName)
    }

}
