import { DI, } from '@airport/di';
import { QueryResultType } from '@airport/ground-control';
import { LOOKUP, QUERY_CONTEXT_LOADER } from '../../../tokens';
export class LookupProxy {
    lookup(rawQuery, queryResultType, search, one, QueryClass, context, cacheForUpdate, mapResults) {
        return DI.db()
            .get(LOOKUP)
            .then(lookup => lookup.lookup(rawQuery, queryResultType, search, one, QueryClass, context, cacheForUpdate, mapResults));
    }
    ensureContext(context) {
        return doEnsureContext(context);
    }
}
export class Lookup {
    async lookup(rawQuery, queryResultType, search, one, QueryClass, context, cacheForUpdate, mapResults) {
        const queryContextLoader = await DI.db().get(QUERY_CONTEXT_LOADER);
        await queryContextLoader.ensure(context);
        let query;
        if (QueryClass) {
            const rawNonEntityQuery = context.ioc.entityUtils.getQuery(rawQuery);
            query = new QueryClass(rawNonEntityQuery);
        }
        else {
            query = context.ioc.entityUtils.getEntityQuery(rawQuery);
            queryResultType = this.getQueryResultType(queryResultType, mapResults);
        }
        let queryMethod;
        if (search) {
            if (one) {
                queryMethod = context.ioc.queryFacade.searchOne;
            }
            else {
                queryMethod = context.ioc.queryFacade.search;
            }
        }
        else {
            if (one) {
                queryMethod = context.ioc.queryFacade.findOne;
            }
            else {
                queryMethod = context.ioc.queryFacade.find;
            }
        }
        return await queryMethod.call(context.ioc.queryFacade, query, this.getQueryResultType(queryResultType, mapResults), context, cacheForUpdate);
    }
    ensureContext(context) {
        return doEnsureContext(context);
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
export function doEnsureContext(context) {
    if (!context) {
        context = {};
    }
    if (!context.startedAt) {
        context.startedAt = new Date();
    }
    return context;
}
DI.set(LOOKUP, Lookup);
//# sourceMappingURL=Lookup.js.map