import { ICoreLocalApiRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import { IContext } from '@airport/direction-indicator';
import { Observable } from 'rxjs';
import { IAbstractQueryContext } from './query/AbstractQueryContext';
import { PortableQuery } from './query/PortableQuery';
import { ISaveResult } from './query/SaveResult';
export declare const INTERNAL_APP = "@airport/terminal";
export declare const INTERNAL_DOMAIN = "internal://domain";
export interface IRootTransaction {
    numberOfOperations: number;
}
export interface IUser {
    _localId?: number;
    email?: string;
    passwordHash?: string;
    username?: string;
    GUID?: string;
}
export interface IActor {
    _localId?: number;
    GUID?: string;
    user?: IUser;
}
export interface IRepository {
    _localId: number;
    ageSuitability?: number;
    createdAt?: Date;
    immutable?: boolean;
    source?: string;
    GUID?: string;
    owner?: IUser;
}
export interface IAirEntity {
    _actorRecordId?: number;
    repository?: IRepository;
    actor?: IActor;
    ageSuitability?: number;
    createdAt?: Date;
    systemWideOperationId?: number;
    originalActorRecordId?: number;
    originalRepository?: IRepository;
    originalActor?: IActor;
    id?: string;
}
export interface ITransactionalConnector {
    callApi(apiInput: ICoreLocalApiRequest): Promise<ILocalAPIResponse>;
    addRepository(context?: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context?: IAbstractQueryContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context?: IAbstractQueryContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context?: IAbstractQueryContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context?: IAbstractQueryContext, cachedSqlQueryId?: number): Observable<E>;
    save<E extends IAirEntity, T = E | E[]>(entity: T, context?: IContext): Promise<ISaveResult>;
    saveToDestination<E extends IAirEntity, T = E | E[]>(repositoryDestination: string, entity: T, context?: IContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, context?: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetLocalIds(portableQuery: PortableQuery, context?: IContext): Promise<number[][] | string[][]>;
    updateValues(portableQuery: PortableQuery, context?: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context?: IContext): Promise<number>;
    onMessage(callback: (message: any) => void): any;
}
//# sourceMappingURL=ITransactionalConnector.d.ts.map