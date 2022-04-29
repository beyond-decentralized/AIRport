export class QueryObjectInitializer {
    generateQObjectsAndPopulateStore(allDdlObjects) {
        this.ddlObjectLinker.link(allDdlObjects);
        this.queryEntityClassCreator.createAll(allDdlObjects.all.applications);
        const lastTerminalState = this.terminalStore.getTerminalState();
        const existingDomainMap = {};
        for (const domain of lastTerminalState.domains) {
            existingDomainMap[domain.name] = domain;
        }
        for (const domain of allDdlObjects.added.domains) {
            delete existingDomainMap[domain.name];
        }
        const unmodifiedDomains = [];
        for (const domainName in existingDomainMap) {
            unmodifiedDomains.push(existingDomainMap[domainName]);
        }
        const existingApplicationMap = {};
        for (const application of lastTerminalState.applications) {
            existingApplicationMap[application.fullName] = application;
        }
        for (const application of allDdlObjects.added.applications) {
            delete existingApplicationMap[application.fullName];
        }
        const unmodifiedApplications = [];
        for (const applicationName in existingApplicationMap) {
            unmodifiedApplications.push(existingApplicationMap[applicationName]);
        }
        this.terminalStore.state.next({
            ...lastTerminalState,
            domains: [
                ...unmodifiedDomains,
                ...allDdlObjects.added.domains
            ],
            applications: [
                ...unmodifiedApplications,
                ...allDdlObjects.added.applications
            ]
        });
    }
    async initialize() {
        const ddlObjects = await this.ddlObjectRetriever.retrieveDdlObjects();
        const allApplicationVersionsByIds = [];
        for (const applicationVersion of ddlObjects.applicationVersions) {
            allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
        }
        let allDdlObjects = {
            all: ddlObjects,
            allApplicationVersionsByIds,
            added: ddlObjects
        };
        this.generateQObjectsAndPopulateStore(allDdlObjects);
        return allDdlObjects;
    }
}
//# sourceMappingURL=QueryObjectInitializer.js.map