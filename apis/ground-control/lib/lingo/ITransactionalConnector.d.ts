import { IContext } from '@airport/di';
import { Observable } from 'rxjs';
import { DistributionStrategy } from './data/DistributionStrategy';
import { PlatformType } from './data/PatformType';
import { PortableQuery } from './query/PortableQuery';
import { ISaveResult } from './query/SaveResult';
export interface ITransactionalConnector {
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, context?: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context?: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context?: IContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context?: IContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context?: IContext, cachedSqlQueryId?: number): Observable<E>;
    save<E, T = E | E[]>(entity: T, context?: IContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, context?: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, context?: IContext): Promise<number[][] | string[][]>;
    updateValues(portableQuery: PortableQuery, context?: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context?: IContext): Promise<number>;
    startTransaction(context: IContext): Promise<boolean>;
    commit(context: IContext): Promise<boolean>;
    rollback(context: IContext): Promise<boolean>;
}
//# sourceMappingURL=ITransactionalConnector.d.ts.map