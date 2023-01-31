import {
    DbDomain,
    DbDomain_Name
} from "@airport/ground-control";

export interface IDomainRetriever {

    retrieveDomain(
        domainName: DbDomain_Name,
        domainNameMapByName: Map<string, DbDomain>,
		allDomains: DbDomain[],
		newDomains: DbDomain[]
    ): Promise<DbDomain>

}
