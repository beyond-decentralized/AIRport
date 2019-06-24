"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../../../diTokens");
class LookupProxy {
    lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults) {
        return di_1.DI.get(diTokens_1.LOOKUP).then(lookup => lookup.lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults));
    }
}
exports.LookupProxy = LookupProxy;
class Lookup {
    async lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults) {
        return await di_1.DI.get(diTokens_1.ENTITY_UTILS, diTokens_1.FIELD_UTILS, diTokens_1.QUERY_FACADE, diTokens_1.QUERY_UTILS, diTokens_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, diTokens_1.UPDATE_CACHE).then(([entityUtils, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache]) => {
            let query;
            if (QueryClass) {
                const rawNonEntityQuery = entityUtils.getQuery(rawQuery);
                query = new QueryClass(rawNonEntityQuery);
            }
            else {
                query = entityUtils.getEntityQuery(rawQuery);
                queryResultType = this.getQueryResultType(queryResultType, mapResults);
            }
            let queryMethod;
            if (search) {
                if (one) {
                    queryMethod = queryFacade.searchOne;
                }
                else {
                    queryMethod = queryFacade.search;
                }
            }
            else {
                if (one) {
                    queryMethod = queryFacade.findOne;
                }
                else {
                    queryMethod = queryFacade.find;
                }
            }
            let result = queryMethod.call(queryFacade, dbEntity, query, this.getQueryResultType(queryResultType, mapResults), fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate);
            return result;
        });
    }
    getQueryResultType(baseQueryResultType, mapResults) {
        switch (baseQueryResultType) {
            case ground_control_1.QueryResultType.ENTITY_GRAPH:
                if (mapResults) {
                    return ground_control_1.QueryResultType.MAPPED_ENTITY_GRAPH;
                }
                return ground_control_1.QueryResultType.ENTITY_GRAPH;
            case ground_control_1.QueryResultType.ENTITY_TREE:
                if (mapResults) {
                    return ground_control_1.QueryResultType.MAPPED_ENTITY_TREE;
                }
                return ground_control_1.QueryResultType.ENTITY_TREE;
            default:
                throw `Unexpected Base Query ResultType: '${baseQueryResultType}'.`;
        }
    }
}
exports.Lookup = Lookup;
di_1.DI.set(diTokens_1.LOOKUP, Lookup);
//# sourceMappingURL=Lookup.js.map