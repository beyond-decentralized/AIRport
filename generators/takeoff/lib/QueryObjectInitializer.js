import { container, DI } from '@airport/di';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER } from './tokens';
export class QueryObjectInitializer {
    async initialize(airDb) {
        const [ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, terminalStore] = await container(this).get(DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER, QUERY_ENTITY_CLASS_CREATOR, TERMINAL_STORE);
        const ddlObjects = await ddlObjectRetriever.retrieveDdlObjects();
        this.generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
        return ddlObjects;
    }
    generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore) {
        ddlObjectLinker.link(ddlObjects, terminalStore);
        queryEntityClassCreator.createAll(ddlObjects.schemas, airDb);
        const lastTerminalState = terminalStore.getTerminalState();
        terminalStore.state.next({
            ...lastTerminalState,
            domains: [
                ...lastTerminalState.domains,
                ...ddlObjects.domains
            ],
            schemas: [
                ...lastTerminalState.schemas,
                ...ddlObjects.schemas
            ]
        });
    }
}
DI.set(QUERY_OBJECT_INITIALIZER, QueryObjectInitializer);
//# sourceMappingURL=QueryObjectInitializer.js.map