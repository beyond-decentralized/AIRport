"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../diTokens");
class QueryManager {
    async find(portableQuery, cachedSqlQueryId) {
        const storeDriver = await di_1.DI.get(ground_control_1.STORE_DRIVER);
        return await storeDriver.find(portableQuery, {}, cachedSqlQueryId);
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        const storeDriver = await di_1.DI.get(ground_control_1.STORE_DRIVER);
        return await storeDriver.findOne(portableQuery, {}, cachedSqlQueryId);
    }
    async search(portableQuery, cachedSqlQueryId) {
        const storeDriver = await di_1.DI.get(ground_control_1.STORE_DRIVER);
        return await storeDriver.search(portableQuery, {}, cachedSqlQueryId);
    }
    async searchOne(portableQuery, cachedSqlQueryId) {
        const storeDriver = await di_1.DI.get(ground_control_1.STORE_DRIVER);
        return await storeDriver.searchOne(portableQuery, {}, cachedSqlQueryId);
    }
}
exports.QueryManager = QueryManager;
di_1.DI.set(diTokens_1.QUERY_MANAGER, QueryManager);
//# sourceMappingURL=QueryManager.js.map