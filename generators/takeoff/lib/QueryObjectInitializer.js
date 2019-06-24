"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("./diTokens");
class QueryObjectInitializer {
    async initialize(airDb) {
        const [ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, terminalStore] = await di_1.DI.get(diTokens_1.DDL_OBJECT_LINKER, diTokens_1.DDL_OBJECT_RETRIEVER, diTokens_1.QUERY_ENTITY_CLASS_CREATOR, terminal_map_1.TERMINAL_STORE);
        const ddlObjects = await ddlObjectRetriever.retrieveDdlObjects();
        this.generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);
    }
    generateQObjectsAndPopulateStore(ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore) {
        ddlObjectLinker.link(ddlObjects);
        queryEntityClassCreator.createAll(ddlObjects.schemas, airDb);
        terminalStore.state.next({
            ...terminalStore.getTerminalState(),
            domains: ddlObjects.domains,
            schemas: ddlObjects.schemas
        });
    }
}
exports.QueryObjectInitializer = QueryObjectInitializer;
di_1.DI.set(diTokens_1.QUERY_OBJECT_INITIALIZER, QueryObjectInitializer);
//# sourceMappingURL=QueryObjectInitializer.js.map