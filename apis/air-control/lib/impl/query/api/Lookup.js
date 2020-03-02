"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const tokens_1 = require("../../../tokens");
class LookupProxy {
    lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults) {
        return di_1.container(this).get(tokens_1.LOOKUP).then(lookup => lookup.lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults));
    }
}
exports.LookupProxy = LookupProxy;
class Lookup {
    async lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults) {
        const [entityUtils, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache] = await di_1.container(this).get(tokens_1.ENTITY_UTILS, tokens_1.FIELD_UTILS, tokens_1.QUERY_FACADE, tokens_1.QUERY_UTILS, tokens_1.SCHEMA_UTILS, ground_control_1.TRANS_CONNECTOR, tokens_1.UPDATE_CACHE);
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
        return await queryMethod.call(queryFacade, dbEntity, query, this.getQueryResultType(queryResultType, mapResults), fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate);
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
                throw new Error(`Unexpected Base Query ResultType: '${baseQueryResultType}'.`);
        }
    }
}
exports.Lookup = Lookup;
di_1.DI.set(tokens_1.LOOKUP, Lookup);
//# sourceMappingURL=Lookup.js.map