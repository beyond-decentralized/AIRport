import { IEntityContext, IQueryContext } from '@airport/air-control';
import { IContext } from '@airport/di';
import { DistributionStrategy, ISaveResult, ITransactionalConnector, PlatformType, PortableQuery } from '@airport/ground-control';
import { IIsolateMessage, LastIds } from '@airport/security-check';
import { Observable, Observer } from 'rxjs';
export interface IMessageInRecord {
    message: IIsolateMessage;
    reject: any;
    resolve: any;
}
export interface IObservableMessageInRecord<T> {
    id: number;
    observer?: Observer<T>;
}
export declare const hostServer = "http://localhost:7000";
export declare enum AppState {
    NOT_INITIALIED = "NOT_INITIALIED",
    START_INITIALIZING = "START_INITIALIZING",
    INITIALIZING_IN_PROGRESS = "INITIALIZING_IN_PROGRESS",
    INITIALIZED = "INITIALIZED"
}
export declare class IframeTransactionalConnector implements ITransactionalConnector {
    dbName: string;
    serverUrl: string;
    pendingMessageMap: Map<number, IMessageInRecord>;
    observableMessageMap: Map<number, IObservableMessageInRecord<any>>;
    messageId: number;
    mainDomain: string;
    appState: AppState;
    lastIds: LastIds;
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Observable<E>;
    save<E, T = E | E[]>(entity: T, context: IEntityContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, context: IContext): Promise<number[][]>;
    updateValues(portableQuery: PortableQuery, context: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number>;
    startTransaction(context: IContext): Promise<boolean>;
    commit(context: IContext): Promise<boolean>;
    rollback(context: IContext): Promise<boolean>;
    private initializeConnection;
    private handleLocalApiRequest;
    private handleDbToIsolateMessage;
    private getCoreFields;
    private sendMessage;
    private sendObservableMessage;
    private wait;
    private isConnectionInitialized;
}
export declare function loadIframeTransactionalConnector(): void;
//# sourceMappingURL=IFrameTransactionalConnector.d.ts.map