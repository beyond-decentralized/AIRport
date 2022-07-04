import { IRepositoryLoader } from '@airport/air-traffic-control';
import { IEntityStateManager, PortableQuery } from '@airport/ground-control';
import { IQueryManager, IQueryOperationContext, IStoreDriver } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export declare class QueryManager implements IQueryManager {
    entityStateManager: IEntityStateManager;
    repositoryLoader: IRepositoryLoader;
    storeDriver: IStoreDriver;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<E>;
    private ensureRepositoryPresenceAndCurrentState;
    private populateEntityGuidEntitiesAndUsers;
    private markEntityGraph;
    isRepositoryOrActor(): void;
}
//# sourceMappingURL=QueryManager.d.ts.map