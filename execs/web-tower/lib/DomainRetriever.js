export class DomainRetriever {
    async retrieveDomain(domainName, domainNameMapByName, allDomains, newDomains) {
        let domain = domainNameMapByName.get(domainName);
        if (domain) {
            return domain;
        }
        domain = await this.transactionalConnector.retrieveDomain(domainName);
        if (domain) {
            domainNameMapByName.set(domainName, domain);
            allDomains.push(domain);
            newDomains.push(domain);
        }
        return domain;
    }
}
//# sourceMappingURL=DomainRetriever.js.map