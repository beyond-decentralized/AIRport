import { AbstractQuery, IAbstractQuery, IFieldUtils, IQueryFacade, IQueryUtils, ISchemaUtils, IUpdateCache, UpdateCacheType } from '@airport/air-control';
import { DbEntity, ITransactionalConnector, PortableQuery, QueryResultType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
export declare class QueryFacade implements IQueryFacade {
    find<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, fieldUtils: IFieldUtils, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache, cacheForUpdate?: UpdateCacheType): Promise<EntityArray>;
    findOne<E>(dbEntity: DbEntity, query: IAbstractQuery, queryResultType: QueryResultType, fieldUtils: IFieldUtils, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache, cacheForUpdate?: UpdateCacheType): Promise<E>;
    getPortableQuery<E>(dbEntity: DbEntity, query: IAbstractQuery, queryResultType: QueryResultType, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): PortableQuery;
    search<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: IAbstractQuery, queryResultType: QueryResultType, fieldUtils: IFieldUtils, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache, cacheForUpdate?: UpdateCacheType): Promise<IObservable<EntityArray>>;
    searchOne<E>(dbEntity: DbEntity, query: IAbstractQuery, queryResultType: QueryResultType, fieldUtils: IFieldUtils, queryUtils: IQueryUtils, schemaUtils: ISchemaUtils, transConnector: ITransactionalConnector, updateCache: IUpdateCache, cacheForUpdate?: UpdateCacheType): Promise<IObservable<E>>;
}
//# sourceMappingURL=QueryFacade.d.ts.map