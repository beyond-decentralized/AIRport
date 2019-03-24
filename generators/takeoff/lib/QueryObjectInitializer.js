"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("./diTokens");
class QueryObjectInitializer {
    constructor() {
        di_1.DI.get((ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator, terminalStore) => {
            this.ddlObjectLinker = ddlObjectLinker;
            this.ddlObjectRetriever = ddlObjectRetriever;
            this.queryEntityClassCreator = queryEntityClassCreator;
            this.terminalStore = terminalStore;
        }, diTokens_1.DDL_OBJECT_LINKER, diTokens_1.DDL_OBJECT_RETRIEVER, diTokens_1.QUERY_ENTITY_CLASS_CREATOR, terminal_map_1.TERMINAL_STORE);
    }
    async initialize() {
        const ddlObjects = await this.ddlObjectRetriever.retrieveDdlObjects();
        this.generateQObjectsAndPopulateStore(ddlObjects);
    }
    generateQObjectsAndPopulateStore(ddlObjects) {
        this.ddlObjectLinker.link(ddlObjects);
        this.queryEntityClassCreator.createAll(ddlObjects.schemas);
        this.terminalStore.state.next({
            ...this.terminalStore.getTerminalState(),
            domains: ddlObjects.domains,
            schemas: ddlObjects.schemas
        });
    }
}
exports.QueryObjectInitializer = QueryObjectInitializer;
di_1.DI.set(diTokens_1.QUERY_OBJECT_INITIALIZER, QueryObjectInitializer);
//# sourceMappingURL=QueryObjectInitializer.js.map