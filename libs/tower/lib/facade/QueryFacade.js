import { QUERY_CONTEXT_LOADER, QUERY_FACADE, UpdateCacheType } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { map } from 'rxjs/operators';
export class QueryFacade {
    async find(query, queryResultType, context, cacheForUpdate = UpdateCacheType.NONE) {
        await this.ensureIocContext(context);
        const result = await context.ioc.transactionalConnector.find(this.getPortableQuery(query, queryResultType, context), context);
        // TODO: restore and property maintain update cache, when needed
        // context.ioc.updateCache.addToCache(
        // 	context.ioc.schemaUtils, cacheForUpdate, context.dbEntity, ...result)
        return result;
    }
    async findOne(query, queryResultType, context, cacheForUpdate = UpdateCacheType.NONE) {
        await this.ensureIocContext(context);
        const result = await context.ioc.transactionalConnector.findOne(this.getPortableQuery(query, queryResultType, context), context);
        context.ioc.updateCache.addToCache(context.ioc.schemaUtils, cacheForUpdate, context.dbEntity, result);
        return result;
    }
    getPortableQuery(query, queryResultType, context) {
        return {
            jsonQuery: query.toJSON(context.ioc.queryUtils, context.ioc.fieldUtils),
            parameterMap: query.getParameters(),
            queryResultType,
            schemaIndex: context.dbEntity.schemaVersion.schema.index,
            tableIndex: context.dbEntity.index,
            // values: query.values
        };
    }
    async search(query, queryResultType, context, cacheForUpdate = UpdateCacheType.NONE) {
        await this.ensureIocContext(context);
        let observable = await context.ioc.transactionalConnector.search(this.getPortableQuery(query, queryResultType, context), context);
        observable = observable.pipe(map((results) => {
            context.ioc.updateCache.addToCache(context.ioc.schemaUtils, cacheForUpdate, context.dbEntity, ...results);
            return results;
        }));
        return observable;
    }
    async searchOne(query, queryResultType, context, cacheForUpdate = UpdateCacheType.NONE) {
        await this.ensureIocContext(context);
        let observable = await context.ioc.transactionalConnector.searchOne(this.getPortableQuery(query, queryResultType, context), context);
        observable = observable.pipe(map(result => {
            context.ioc.updateCache.addToCache(context.ioc.schemaUtils, cacheForUpdate, context.dbEntity, result);
            return result;
        }));
        return observable;
    }
    async ensureIocContext(context) {
        const queryContextLoader = await container(this)
            .get(QUERY_CONTEXT_LOADER);
        await queryContextLoader.ensure(context);
    }
}
DI.set(QUERY_FACADE, QueryFacade);
//# sourceMappingURL=QueryFacade.js.map