import { DI } from '@airport/di';
import { QueryResultType, TRANS_CONNECTOR } from '@airport/ground-control';
import { ENTITY_UTILS, FIELD_UTILS, LOOKUP, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, UPDATE_CACHE } from '../../../tokens';
export class LookupProxy {
    lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults) {
        return DI.db()
            .get(LOOKUP)
            .then(lookup => lookup.lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults));
    }
}
export class Lookup {
    async lookup(rawQuery, queryResultType, search, one, QueryClass, dbEntity, cacheForUpdate, mapResults) {
        const [entityUtils, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache] = await DI.db()
            .get(ENTITY_UTILS, FIELD_UTILS, QUERY_FACADE, QUERY_UTILS, SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE);
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
            case QueryResultType.ENTITY_GRAPH:
                if (mapResults) {
                    return QueryResultType.MAPPED_ENTITY_GRAPH;
                }
                return QueryResultType.ENTITY_GRAPH;
            case QueryResultType.ENTITY_TREE:
                if (mapResults) {
                    return QueryResultType.MAPPED_ENTITY_TREE;
                }
                return QueryResultType.ENTITY_TREE;
            default:
                throw new Error(`Unexpected Base Query ResultType: '${baseQueryResultType}'.`);
        }
    }
}
DI.set(LOOKUP, Lookup);
//# sourceMappingURL=Lookup.js.map