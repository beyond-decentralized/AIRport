import { IEntityContext, IQueryContext } from '@airport/air-control';
import { ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import { IContext } from '@airport/di';
import { ISaveResult, ITransactionalConnector, PortableQuery } from '@airport/ground-control';
import { Observable } from 'rxjs';
export declare class InternalTransactionalConnector implements ITransactionalConnector {
    callApi<Request, Response>(_: ILocalAPIRequest): Promise<ILocalAPIResponse>;
    addRepository(context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryContext, cachedSqlQueryId?: number): Observable<E>;
    save<E, T = E | E[]>(entity: T, context: IEntityContext): Promise<ISaveResult>;
    saveToDestination<E, T = E | E[]>(repositoryDestination: string, entity: T, context?: IContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, context: IContext): Promise<number[][]>;
    updateValues(portableQuery: PortableQuery, context: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number>;
    startTransaction(context: IContext): Promise<boolean>;
    commit(context: IContext): Promise<boolean>;
    rollback(context: IContext): Promise<boolean>;
    onMessage(callback: (message: any) => void): void;
}
export declare function injectTransactionalConnector(): void;
//# sourceMappingURL=InternalTransactionalConnector.d.ts.map