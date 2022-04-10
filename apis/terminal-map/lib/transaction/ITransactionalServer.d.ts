import { IEntityContext } from '@airport/air-control';
import { IContext } from '@airport/di';
import { ISaveResult, PortableQuery } from '@airport/ground-control';
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
    save<E>(entity: E, credentials: ITransactionCredentials, context: IEntityContext): Promise<ISaveResult>;
    saveToDestination<E>(repositoryDestination: string, entity: E, credentials: ITransactionCredentials, context: IEntityContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IContext): Promise<number[][]>;
    updateValues(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IContext): Promise<number>;
}
//# sourceMappingURL=ITransactionalServer.d.ts.map