"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const diTokens_1 = require("./diTokens");
class QueryFacade {
    /*
    private connector: ITransactionalConnector
    public databaseFacade: IDatabaseFacade

    async init(): Promise<void> {
        this.connector = await DI.getP(TRANS_CONNECTOR)
    }
*/
    async find(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const [fieldUtils, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, diTokens_1.UPDATE_CACHE);
        const result = await transConnector.find(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
        updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, ...result);
        return result;
    }
    async findOne(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const [fieldUtils, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_UTILS, air_control_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, diTokens_1.UPDATE_CACHE);
        const result = await transConnector.findOne(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
        updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, result);
        return result;
    }
    search(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        return observe_1.Observable.from(this.doSearch(dbEntity, query, queryResultType, cacheForUpdate));
    }
    searchOne(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        return observe_1.Observable.from(this.doSearchOne(dbEntity, query, queryResultType, cacheForUpdate));
    }
    getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils) {
        return {
            jsonQuery: query.toJSON(queryUtils, fieldUtils),
            parameterMap: query.getParameters(),
            queryResultType,
            schemaIndex: dbEntity.schemaVersion.schema.index,
            tableIndex: dbEntity.index,
        };
    }
    async doSearch(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const [fieldUtils, queryUtils, transConnector] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_UTILS, ground_control_1.TRANS_CONNECTOR);
        return transConnector.search(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
    }
    async doSearchOne(dbEntity, query, queryResultType, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const [fieldUtils, queryUtils, transConnector] = await di_1.DI.get(air_control_1.FIELD_UTILS, air_control_1.QUERY_UTILS, ground_control_1.TRANS_CONNECTOR);
        return transConnector.searchOne(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
    }
}
exports.QueryFacade = QueryFacade;
di_1.DI.set(air_control_1.QUERY_FACADE, QueryFacade);
//# sourceMappingURL=QueryFacade.js.map