import { container, DI } from '@airport/di';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER } from './tokens';
export class QueryObjectInitializer {
    generateQObjectsAndPopulateStore(allDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore) {
        ddlObjectLinker.link(allDdlObjects, terminalStore);
        queryEntityClassCreator.createAll(allDdlObjects.all.applications, airDb);
        const lastTerminalState = terminalStore.getTerminalState();
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
            existingApplicationMap[application.name] = application;
        }
        for (const application of allDdlObjects.added.applications) {
            delete existingApplicationMap[application.name];
        }
        const unmodifiedApplications = [];
        for (const applicationName in existingApplicationMap) {
            unmodifiedApplications.push(existingApplicationMap[applicationName]);
        }
        terminalStore.state.next({
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
    async initialize(airDb) {
        const [ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, terminalStore] = await container(this).get(DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, TERMINAL_STORE);
        const ddlObjects = await ddlObjectRetriever.retrieveDdlObjects();
        const allApplicationVersionsByIds = [];
        for (const applicationVersion of ddlObjects.applicationVersions) {
            allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
        }
        let allDdlObjects = {
            all: ddlObjects,
            allApplicationVersionsByIds,
            added: ddlObjects
        };
        this.generateQObjectsAndPopulateStore(allDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        return allDdlObjects;
    }
}
DI.set(QUERY_OBJECT_INITIALIZER, QueryObjectInitializer);
//# sourceMappingURL=QueryObjectInitializer.js.map