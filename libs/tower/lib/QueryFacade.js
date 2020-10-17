import { QUERY_FACADE, UpdateCacheType } from '@airport/air-control';
import { DI } from '@airport/di';
import { map } from '@airport/observe';
export class QueryFacade {
    async find(dbEntity, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate = UpdateCacheType.NONE) {
        const result = await transConnector.find(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
        updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, ...result);
        return result;
    }
    async findOne(dbEntity, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate = UpdateCacheType.NONE) {
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
    async search(dbEntity, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate = UpdateCacheType.NONE) {
        let observable = await transConnector.search(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
        observable = observable.pipe(map(results => {
            updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, ...results);
            return results;
        }));
        return observable;
    }
    async searchOne(dbEntity, query, queryResultType, fieldUtils, queryUtils, schemaUtils, transConnector, updateCache, cacheForUpdate = UpdateCacheType.NONE) {
        let observable = await transConnector.searchOne(this.getPortableQuery(dbEntity, query, queryResultType, queryUtils, fieldUtils));
        observable = observable.pipe(map(result => {
            updateCache.addToCache(schemaUtils, cacheForUpdate, dbEntity, result);
            return result;
        }));
        return observable;
    }
}
DI.set(QUERY_FACADE, QueryFacade);
//# sourceMappingURL=QueryFacade.js.map