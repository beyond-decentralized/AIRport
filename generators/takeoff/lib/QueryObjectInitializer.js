import { container, DI } from '@airport/di';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER } from './tokens';
export class QueryObjectInitializer {
    generateQObjectsAndPopulateStore(allDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore) {
        ddlObjectLinker.link(allDdlObjects, terminalStore);
        queryEntityClassCreator.createAll(allDdlObjects.all.schemas, airDb);
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
        const existingSchemaMap = {};
        for (const schema of lastTerminalState.schemas) {
            existingSchemaMap[schema.name] = schema;
        }
        for (const schema of allDdlObjects.added.schemas) {
            delete existingSchemaMap[schema.name];
        }
        const unmodifiedSchemas = [];
        for (const schemaName in existingSchemaMap) {
            unmodifiedSchemas.push(existingSchemaMap[schemaName]);
        }
        terminalStore.state.next({
            ...lastTerminalState,
            domains: [
                ...unmodifiedDomains,
                ...allDdlObjects.added.domains
            ],
            schemas: [
                ...unmodifiedSchemas,
                ...allDdlObjects.added.schemas
            ]
        });
    }
    async initialize(airDb) {
        const [ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, terminalStore] = await container(this).get(DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, TERMINAL_STORE);
        const ddlObjects = await ddlObjectRetriever.retrieveDdlObjects();
        const allSchemaVersionsByIds = [];
        for (const schemaVersion of ddlObjects.schemaVersions) {
            allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
        }
        let allDdlObjects = {
            all: ddlObjects,
            allSchemaVersionsByIds,
            added: ddlObjects
        };
        this.generateQObjectsAndPopulateStore(allDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        return allDdlObjects;
    }
}
DI.set(QUERY_OBJECT_INITIALIZER, QueryObjectInitializer);
//# sourceMappingURL=QueryObjectInitializer.js.map