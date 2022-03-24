import {
    DbDomain,
    DomainName
} from "@airport/ground-control";

export interface IDomainRetriever {

    retrieveDomain(
        domainName: DomainName,
        domainNameMapByName: Map<string, DbDomain>,
		allDomains: DbDomain[],
		newDomains: DbDomain[]
    ): Promise<DbDomain>

}
