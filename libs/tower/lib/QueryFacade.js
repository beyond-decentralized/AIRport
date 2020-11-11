import { IocQueryContext, QUERY_FACADE, UpdateCacheType } from '@airport/air-control';
import { DI } from '@airport/di';
import { map } from '@airport/observe';
export class QueryFacade {
    async find(query, queryResultType, ctx, cacheForUpdate = UpdateCacheType.NONE) {
        await this.ensureIocContext(ctx);
        const result = await ctx.ioc.transactionalConnector.find(this.getPortableQuery(query, queryResultType, ctx));
        ctx.ioc.updateCache.addToCache(ctx.ioc.schemaUtils, cacheForUpdate, ctx.dbEntity, ...result);
        return result;
    }
    async findOne(query, queryResultType, ctx, cacheForUpdate = UpdateCacheType.NONE) {
        await this.ensureIocContext(ctx);
        const result = await ctx.ioc.transactionalConnector.findOne(this.getPortableQuery(query, queryResultType, ctx));
        ctx.ioc.updateCache.addToCache(ctx.ioc.schemaUtils, cacheForUpdate, ctx.dbEntity, result);
        return result;
    }
    getPortableQuery(query, queryResultType, ctx) {
        return {
            jsonQuery: query.toJSON(ctx.ioc.queryUtils, ctx.ioc.fieldUtils),
            parameterMap: query.getParameters(),
            queryResultType,
            schemaIndex: ctx.dbEntity.schemaVersion.schema.index,
            tableIndex: ctx.dbEntity.index,
        };
    }
    async search(query, queryResultType, ctx, cacheForUpdate = UpdateCacheType.NONE) {
        await this.ensureIocContext(ctx);
        let observable = await ctx.ioc.transactionalConnector.search(this.getPortableQuery(query, queryResultType, ctx));
        observable = observable.pipe(map(results => {
            ctx.ioc.updateCache.addToCache(ctx.ioc.schemaUtils, cacheForUpdate, ctx.dbEntity, ...results);
            return results;
        }));
        return observable;
    }
    async searchOne(query, queryResultType, ctx, cacheForUpdate = UpdateCacheType.NONE) {
        await this.ensureIocContext(ctx);
        let observable = await ctx.ioc.transactionalConnector.searchOne(this.getPortableQuery(query, queryResultType, ctx));
        observable = observable.pipe(map(result => {
            ctx.ioc.updateCache.addToCache(ctx.ioc.schemaUtils, cacheForUpdate, ctx.dbEntity, result);
            return result;
        }));
        return observable;
    }
    async ensureIocContext(ctx) {
        await IocQueryContext.ensure(ctx);
    }
}
DI.set(QUERY_FACADE, QueryFacade);
//# sourceMappingURL=QueryFacade.js.map