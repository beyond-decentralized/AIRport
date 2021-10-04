import { IEntityContext } from '@airport/air-control';
import { IContext } from '@airport/di';
import { ISaveResult, PortableQuery } from '@airport/ground-control';
import { Observable } from 'rxjs';
import { ICredentials } from '../Credentials';
export interface ITransactionalServer {
    init(context?: IContext): Promise<void>;
    addRepository(name: string, credentials: ICredentials, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Observable<E>;
    startTransaction(credentials: ICredentials, context: IContext): Promise<boolean>;
    commit(credentials: ICredentials, context: IContext): Promise<boolean>;
    rollback(credentials: ICredentials, context: IContext): Promise<boolean>;
    save<E>(entity: E, credentials: ICredentials, context: IEntityContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, credentials: ICredentials, context: IContext): Promise<number[][]>;
    updateValues(portableQuery: PortableQuery, credentials: ICredentials, context: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, credentials: ICredentials, context: IContext): Promise<number>;
}
//# sourceMappingURL=ITransactionalServer.d.ts.map