"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
class QueryFacade {
    /*
    private connector: ITransactionalConnector
    public databaseFacade: IDatabaseFacade

    async init(): Promise<void> {
        this.connector = await DI.getP(TRANS_CONNECTOR)
    }
*/
    async find(dbEntity, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const result = await transConnector.find(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
        updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, ...result);
        return result;
    }
    async findOne(dbEntity, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        const result = await transConnector.findOne(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
        updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, result);
        return result;
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
    async search(dbEntity, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        return transConnector.search(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils)).pipe(map(results => {
            updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, ...results);
            return results;
        }));
    }
    async searchOne(dbEntity, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate = air_control_1.UpdateCacheType.NONE) {
        return transConnector.searchOne(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils)).pipe(map(result => {
            updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, result);
            return results;
        }));
    }
}
exports.QueryFacade = QueryFacade;
di_1.DI.set(air_control_1.QUERY_FACADE, QueryFacade);
//# sourceMappingURL=QueryFacade.js.map