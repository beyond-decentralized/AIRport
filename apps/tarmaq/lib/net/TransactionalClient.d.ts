import { IDatabaseFacade, UpdateCacheType } from "@airport/air-control";
import { PortableQuery } from "@airport/ground-control";
import { DistributionStrategy, PlatformType } from "@airport/terminal-map";
import { IInternalTransactionalConnector } from "@airport/tower";
import { Observable } from 'rxjs';
export declare class TransactionalClient implements IInternalTransactionalConnector {
    private databaseFacade;
    serverUrl: string;
    dbName: string;
    constructor(databaseFacade: IDatabaseFacade);
    startTransaction(): Promise<number>;
    rollbackTransaction(transactionIndex: number): Promise<void>;
    commitTransaction(transactionIndex: number): Promise<void>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    insertValues(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
    updateValues(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cacheForUpdate: UpdateCacheType): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, cacheForUpdate?: UpdateCacheType): Observable<E>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
}
