import { IAirportDatabase, IRepositoryLoader } from '@airport/air-traffic-control';
import { IObservableQueryAdapter } from '@airport/flight-number';
import { PortableQuery } from '@airport/ground-control';
import { IActorDao, IRepositoryDao } from '@airport/holding-pattern/dist/app/bundle';
import { IQueryManager, IQueryOperationContext, IStoreDriver } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export declare class QueryManager implements IQueryManager {
    actorDao: IActorDao;
    airportDatabase: IAirportDatabase;
    observableQueryAdapter: IObservableQueryAdapter;
    repositoryDao: IRepositoryDao;
    repositoryLoader: IRepositoryLoader;
    storeDriver: IStoreDriver;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<E>;
    private ensureRepositoryPresenceAndCurrentState;
    private populateEntityGuidEntitiesAndUserAccounts;
    private markEntities;
    private processRepositoryOrActor;
    private populateActorsAndUserAccounts;
    private populateRepositories;
}
//# sourceMappingURL=QueryManager.d.ts.map