"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../diTokens");
class QueryManager {
    find(portableQuery, cachedSqlQueryId) {
        return di_1.DI.get(ground_control_1.STORE_DRIVER).then(storeDriver => storeDriver.find(portableQuery, cachedSqlQueryId));
    }
    findOne(portableQuery, cachedSqlQueryId) {
        return di_1.DI.get(ground_control_1.STORE_DRIVER).then(storeDriver => storeDriver.findOne(portableQuery, cachedSqlQueryId));
    }
    search(portableQuery, cachedSqlQueryId) {
        return di_1.DI.get(ground_control_1.STORE_DRIVER).then(storeDriver => storeDriver.search(portableQuery, cachedSqlQueryId));
    }
    searchOne(portableQuery, cachedSqlQueryId) {
        return di_1.DI.get(ground_control_1.STORE_DRIVER).then(storeDriver => storeDriver.searchOne(portableQuery, cachedSqlQueryId));
    }
}
exports.QueryManager = QueryManager;
di_1.DI.set(diTokens_1.QUERY_MANAGER, QueryManager);
//# sourceMappingURL=QueryManager.js.map