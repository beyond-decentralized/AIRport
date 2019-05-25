import { PortableQuery } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { DistributionStrategy, ICredentials, PlatformType } from '@airport/terminal-map';
export interface ITransactionalServer {
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, credentials: ICredentials): Promise<number>;
    transact(credentials: ICredentials): Promise<void>;
    rollback(credentials: ICredentials): Promise<void>;
    commit(credentials: ICredentials): Promise<void>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, credentials: ICredentials, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, cachedSqlQueryId?: number): IObservable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, credentials: ICredentials, cachedSqlQueryId?: number): IObservable<E>;
    insertValues(portableQuery: PortableQuery, credentials: ICredentials, transactionIndex?: number, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, credentials: ICredentials, transactionIndex?: number): Promise<number[] | string[]>;
    updateValues(portableQuery: PortableQuery, credentials: ICredentials, transactionIndex?: number): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, credentials: ICredentials, transactionIndex?: number): Promise<number>;
}
