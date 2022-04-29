import { IEntityContext, IQueryContext } from '@airport/air-control';
import { IApplicationVersion } from '@airport/airspace';
import { ICoreLocalApiRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import { IContext } from '@airport/direction-indicator';
import { DbDomain, DomainName, ISaveResult, ITransactionalConnector, PortableQuery } from '@airport/ground-control';
import { IIsolateMessage, LastIds, IApplicationLoader, ILocalAPIServer } from '@airport/security-check';
import { Observable, Observer } from 'rxjs';
export interface IMessageInRecord {
    message: IIsolateMessage;
    reject: any;
    resolve: any;
}
export interface IObservableMessageInRecord<T> {
    id: string;
    observer?: Observer<T>;
}
export declare const hostServer = "http://localhost:7500";
export declare enum AppState {
    NOT_INITIALIED = "NOT_INITIALIED",
    START_INITIALIZING = "START_INITIALIZING",
    INITIALIZING_IN_PROGRESS = "INITIALIZING_IN_PROGRESS",
    INITIALIZED = "INITIALIZED"
}
export interface IIframeTransactionalConnector extends ITransactionalConnector {
    getLatestApplicationVersionMapByFullApplicationName(applicationName: string): Promise<IApplicationVersion>;
    retrieveDomain(domainName: DomainName): Promise<DbDomain>;
}
export declare class IframeTransactionalConnector implements IIframeTransactionalConnector {
    applicationLoader: IApplicationLoader;
    localApiServer: ILocalAPIServer;
    application: string;
    appState: AppState;
    dbName: string;
    domain: string;
    lastIds: LastIds;
    mainDomain: string;
    messageId: number;
    observableMessageMap: Map<string, IObservableMessageInRecord<any>>;
    pendingMessageMap: Map<string, IMessageInRecord>;
    serverUrl: string;
    messageCallback: (message: any) => void;
    init(): Promise<void>;
    callApi<Request, Response>(apiInput: ICoreLocalApiRequest): Promise<ILocalAPIResponse>;
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
    getLatestApplicationVersionMapByFullApplicationName(fullApplicationName: string): Promise<IApplicationVersion>;
    private initializeConnection;
    private handleLocalApiRequest;
    private handleDbToIsolateMessage;
    private getCoreFields;
    private sendMessage;
    private sendMessageNoWait;
    private sendObservableMessage;
    private wait;
    private isConnectionInitialized;
    retrieveDomain(domainName: DomainName): Promise<DbDomain>;
    onMessage(callback: (message: any) => void): void;
}
//# sourceMappingURL=IFrameTransactionalConnector.d.ts.map