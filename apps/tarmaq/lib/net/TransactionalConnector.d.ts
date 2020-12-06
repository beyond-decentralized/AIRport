import { IQueryContext } from '@airport/air-control';
import { IContext } from '@airport/di';
import { DistributionStrategy, ITransactionalConnector, PlatformType, PortableQuery } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { IOperationContext } from '@airport/tower';
export declare class TransactionalConnector implements ITransactionalConnector {
    dbName: string;
    serverUrl: string;
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, context: IOperationContext<any, any>): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<IObservable<E>>;
    save<E, T = E | E[]>(entity: T, context: IContext): Promise<number>;
}
export declare function injectTransactionalConnector(): void;
//# sourceMappingURL=TransactionalConnector.d.ts.map