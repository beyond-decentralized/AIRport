import { DistributionStrategy, PlatformType, PortableQuery } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
export interface ITransactionalConnector {
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<IObservable<E>>;
}
//# sourceMappingURL=ITransactionalConnector.d.ts.map