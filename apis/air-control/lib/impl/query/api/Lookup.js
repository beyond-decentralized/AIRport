import { DI, } from '@airport/di';
import { QueryResultType } from '@airport/ground-control';
import { LOOKUP, QUERY_CONTEXT_LOADER } from '../../../tokens';
export class LookupProxy {
    lookup(rawQuery, queryResultType, search, one, QueryClass, ctx, cacheForUpdate, mapResults) {
        return DI.db()
            .get(LOOKUP)
            .then(lookup => lookup.lookup(rawQuery, queryResultType, search, one, QueryClass, ctx, cacheForUpdate, mapResults));
    }
    ensureContext(ctx) {
        return doEnsureContext(ctx);
    }
}
export class Lookup {
    async lookup(rawQuery, queryResultType, search, one, QueryClass, ctx, cacheForUpdate, mapResults) {
        const queryContextLoader = await DI.db().get(QUERY_CONTEXT_LOADER);
        await queryContextLoader.ensure(ctx);
        let query;
        if (QueryClass) {
            const rawNonEntityQuery = ctx.ioc.entityUtils.getQuery(rawQuery);
            query = new QueryClass(rawNonEntityQuery);
        }
        else {
            query = ctx.ioc.entityUtils.getEntityQuery(rawQuery);
            queryResultType = this.getQueryResultType(queryResultType, mapResults);
        }
        let queryMethod;
        if (search) {
            if (one) {
                queryMethod = ctx.ioc.queryFacade.searchOne;
            }
            else {
                queryMethod = ctx.ioc.queryFacade.search;
            }
        }
        else {
            if (one) {
                queryMethod = ctx.ioc.queryFacade.findOne;
            }
            else {
                queryMethod = ctx.ioc.queryFacade.find;
            }
        }
        return await queryMethod.call(ctx.ioc.queryFacade, query, this.getQueryResultType(queryResultType, mapResults), ctx, cacheForUpdate);
    }
    ensureContext(ctx) {
        return doEnsureContext(ctx);
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
export function doEnsureContext(ctx) {
    if (!ctx) {
        ctx = {};
    }
    if (!ctx.startedAt) {
        ctx.startedAt = new Date();
    }
    return ctx;
}
DI.set(LOOKUP, Lookup);
//# sourceMappingURL=Lookup.js.map