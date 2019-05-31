"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("./diTokens");
class QueryFacade {
    async init() {
        this.connector = await di_1.DI.getP(ground_control_1.TRANS_CONNECTOR);
    }
    async find(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const result = await this.connector.find(this.getPortableQuery(dbEntity, query, queryResultType));
        if (cacheForUpdate !== air_control_1.UpdateCacheType.NONE) {
            this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, ...result);
        }
        return result;
    }
    async findOne(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const result = await this.connector.findOne(this.getPortableQuery(dbEntity, query, queryResultType));
        if (cacheForUpdate !== air_control_1.UpdateCacheType.NONE) {
            this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, result);
        }
        return result;
    }
    search(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        return this.connector.search(this.getPortableQuery(dbEntity, query, queryResultType));
    }
    searchOne(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        return this.connector.searchOne(this.getPortableQuery(dbEntity, query, queryResultType));
    }
    getPortableQuery(dbEntity, query, queryResultType, cacheForUpdate = false) {
        return {
            jsonQuery: query.toJSON(),
            parameterMap: query.getParameters(),
            queryResultType,
            schemaIndex: dbEntity.schemaVersion.schema.index,
            tableIndex: dbEntity.index,
            values: query.values
        };
    }
}
exports.QueryFacade = QueryFacade;
di_1.DI.set(diTokens_1.QUERY_FACADE, QueryFacade);
//# sourceMappingURL=QueryFacade.js.map