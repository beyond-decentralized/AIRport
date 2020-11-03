import { DistributionStrategy, PlatformType, PortableQuery } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { ITransaction } from './ITransaction';
export interface ITransactionalConnector {
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<IObservable<E>>;
    insertValues(portableQuery: PortableQuery, transaction: ITransaction, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, transaction: ITransaction): Promise<number[] | string[] | number[][] | string[][]>;
    updateValues(portableQuery: PortableQuery, transaction: ITransaction): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, transaction: ITransaction): Promise<number>;
}
//# sourceMappingURL=ITransactionalConnector.d.ts.map