import { DistributionStrategy, ITransactionalConnector, PlatformType, PortableQuery } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
export declare class TransactionalConnector implements ITransactionalConnector {
    dbName: string;
    serverUrl: string;
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
    transact(): Promise<void>;
    rollback(): Promise<void>;
    commit(): Promise<void>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<IObservable<E>>;
    insertValues(portableQuery: PortableQuery, transactionIndex?: number, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, transactionIndex?: number): Promise<number[] | string[]>;
    updateValues(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
}
