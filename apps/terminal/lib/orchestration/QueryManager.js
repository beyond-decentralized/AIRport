"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../diTokens");
class QueryManager {
    constructor() {
        di_1.DI.get((dataStore) => {
            this.dataStore = dataStore;
        }, ground_control_1.STORE_DRIVER);
    }
    async find(portableQuery, cachedSqlQueryId) {
        return await this.dataStore.find(portableQuery, cachedSqlQueryId);
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        return await this.dataStore.findOne(portableQuery, cachedSqlQueryId);
    }
    search(portableQuery, cachedSqlQueryId) {
        return this.dataStore.search(portableQuery, cachedSqlQueryId);
    }
    searchOne(portableQuery, cachedSqlQueryId) {
        return this.dataStore.searchOne(portableQuery, cachedSqlQueryId);
    }
}
exports.QueryManager = QueryManager;
di_1.DI.set(diTokens_1.QUERY_MANAGER, QueryManager);
//# sourceMappingURL=QueryManager.js.map