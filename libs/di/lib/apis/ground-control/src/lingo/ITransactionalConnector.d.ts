import { IContext } from '@airport/di';
import { IObservable } from '@airport/observe';
import { DistributionStrategy } from './data/DistributionStrategy';
import { PlatformType } from './data/PatformType';
import { PortableQuery } from './query/PortableQuery';
export interface ITransactionalConnector {
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<IObservable<E>>;
    save<E, T = E | E[]>(entity: T, context: IContext): Promise<number>;
}
//# sourceMappingURL=ITransactionalConnector.d.ts.map