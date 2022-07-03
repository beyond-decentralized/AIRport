import {
    DbDomain,
    Domain_Name
} from "@airport/ground-control";

export interface IDomainRetriever {

    retrieveDomain(
        domainName: Domain_Name,
        domainNameMapByName: Map<string, DbDomain>,
		allDomains: DbDomain[],
		newDomains: DbDomain[]
    ): Promise<DbDomain>

}
