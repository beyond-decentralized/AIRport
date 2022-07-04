import { IEntityContext } from '@airport/air-traffic-control';
import { IContext } from '@airport/direction-indicator';
import { ISaveResult, PortableQuery } from '@airport/ground-control';
import { IAirEntity } from '@airport/holding-pattern';
import { Observable } from 'rxjs';
import { IQueryOperationContext } from '..';
import { ICredentials, ITransactionCredentials } from '../Credentials';
export interface ITransactionalServer {
    init(context?: IContext): Promise<void>;
    addRepository(credentials: ITransactionCredentials, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<E>;
    startTransaction(credentials: ITransactionCredentials, context: IContext): Promise<boolean>;
    commit(credentials: ITransactionCredentials, context: IContext): Promise<boolean>;
    rollback(credentials: ITransactionCredentials, context: IContext): Promise<boolean>;
    save<E extends IAirEntity, T = E | E[]>(entity: T, credentials: ITransactionCredentials, context: IEntityContext): Promise<ISaveResult>;
    saveToDestination<E extends IAirEntity, T = E | E[]>(repositoryDestination: string, entity: T, credentials: ITransactionCredentials, context: IEntityContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetLocalIds(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IContext): Promise<number[][]>;
    updateValues(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IContext): Promise<number>;
}
//# sourceMappingURL=ITransactionalServer.d.ts.map