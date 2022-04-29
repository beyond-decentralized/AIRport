import { DEPENDENCY_INJECTION, } from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { ENTITY_UTILS, LOOKUP, QUERY_FACADE } from '../../../tokens';
export class LookupProxy {
    ensureContext(context) {
        return doEnsureContext(context);
    }
    lookup(rawQuery, queryResultType, search, one, QueryClass, context, mapResults) {
        return DEPENDENCY_INJECTION.db()
            .get(LOOKUP)
            .then(lookup => lookup.lookup(rawQuery, queryResultType, search, one, QueryClass, context, mapResults));
    }
}
export class Lookup {
    ensureContext(context) {
        return doEnsureContext(context);
    }
    async lookup(rawQuery, queryResultType, search, one, QueryClass, context, mapResults) {
        const [entityUtils, queryFacade] = await DEPENDENCY_INJECTION.db()
            .get(ENTITY_UTILS, QUERY_FACADE);
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
        let result = await queryMethod.call(queryFacade, query, this.getQueryResultType(queryResultType, mapResults), context);
        if (!one && !result) {
            result = [];
        }
        return result;
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
            case QueryResultType.FIELD:
            case QueryResultType.RAW:
            case QueryResultType.TREE:
            case QueryResultType.SHEET:
                return baseQueryResultType;
            default:
                throw new Error(`Unexpected Base Query ResultType: '${baseQueryResultType}'.`);
        }
    }
}
export function doEnsureContext(context) {
    if (!context) {
        context = {};
    }
    if (!context.startedAt) {
        context.startedAt = new Date();
    }
    return context;
}
//# sourceMappingURL=Lookup.js.map