import {
    IDomain,
    Domain_Name
} from "@airport/ground-control";

export interface IDomainRetriever {

    retrieveDomain(
        domainName: Domain_Name,
        domainNameMapByName: Map<string, IDomain>,
		allDomains: IDomain[],
		newDomains: IDomain[]
    ): Promise<IDomain>

}
