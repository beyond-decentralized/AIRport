import { IAirportDatabase, IRepositoryLoader } from '@airport/air-traffic-control';
import { PortableQuery } from '@airport/ground-control';
import { IActorDao, IRepositoryDao } from '@airport/holding-pattern/lib/dao/dao';
import { IQueryManager, IQueryOperationContext, IStoreDriver } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export declare class QueryManager implements IQueryManager {
    actorDao: IActorDao;
    airportDatabase: IAirportDatabase;
    repositoryDao: IRepositoryDao;
    repositoryLoader: IRepositoryLoader;
    storeDriver: IStoreDriver;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<E>;
    private ensureRepositoryPresenceAndCurrentState;
    private populateEntityGuidEntitiesAndUsers;
    private markEntities;
    private processRepositoryOrActor;
    private populateActorsAndUsers;
    private populateRepositories;
}
//# sourceMappingURL=QueryManager.d.ts.map