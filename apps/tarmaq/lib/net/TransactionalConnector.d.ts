import { DistributionStrategy, ITransactionalConnector, PlatformType, PortableQuery } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { ITransactionalServer } from '@airport/tower';
export declare const BOGUS = 0;
export declare class TransactionalConnector implements ITransactionalConnector {
    private databaseFacade;
    dbName: string;
    serverUrl: string;
    transServer: ITransactionalServer;
    constructor();
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
    transact(): Promise<void>;
    rollback(): Promise<void>;
    commit(): Promise<void>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): IObservable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): IObservable<E>;
    insertValues(portableQuery: PortableQuery, transactionIndex?: number, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, transactionIndex?: number): Promise<number[] | string[]>;
    updateValues(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
}
