import { IRepositoryLoader } from '@airport/air-control';
import { PortableQuery } from '@airport/ground-control';
import { IQueryManager, IQueryOperationContext, IStoreDriver } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export declare class QueryManager implements IQueryManager {
    repositoryLoader: IRepositoryLoader;
    storeDriver: IStoreDriver;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<E>;
    private ensureRepositoryPresenceAndCurrentState;
}
//# sourceMappingURL=QueryManager.d.ts.map