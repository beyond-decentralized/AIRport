import { DbDomain, DomainName } from '@airport/ground-control';
import { IDomainRetriever } from '@airport/terminal-map';
export declare class DomainRetriever implements IDomainRetriever {
    retrieveDomain(domainName: DomainName, domainNameMapByName: Map<string, DbDomain>, allDomains: DbDomain[], newDomains: DbDomain[]): Promise<DbDomain>;
}
//# sourceMappingURL=DomainRetriever.d.ts.map