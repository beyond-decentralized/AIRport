import { IEntityContext, IQueryContext } from '@airport/air-traffic-control';
import { IApplicationVersion } from '@airport/airspace';
import { ICoreLocalApiRequest, ILocalAPIRequest } from '@airport/aviation-communication';
import { IContext } from '@airport/direction-indicator';
import { DbDomain, DomainName, IDbApplicationUtils, ISaveResult, ITransactionalConnector, PortableQuery } from '@airport/ground-control';
import { IIsolateMessageOut, IApplicationLoader, ILocalAPIServer, IApplicationStore } from '@airport/apron';
import { Observable } from 'rxjs';
import { ITerminalStore } from '@airport/terminal-map';
export interface IIframeTransactionalConnector extends ITransactionalConnector {
    getLatestApplicationVersionMapByFullApplicationName(applicationName: string): Promise<IApplicationVersion>;
    initializeConnection(): Promise<void>;
    processMessage(message: IIsolateMessageOut<any> | ILocalAPIRequest, origin: string): Promise<void>;
    retrieveDomain(domainName: DomainName): Promise<DbDomain>;
}
export declare class IframeTransactionalConnector implements IIframeTransactionalConnector {
    applicationLoader: IApplicationLoader;
    applicationStore: IApplicationStore;
    dbApplicationUtils: IDbApplicationUtils;
    localApiServer: ILocalAPIServer;
    terminalStore: ITerminalStore;
    processMessage(message: IIsolateMessageOut<any> | ILocalAPIRequest, origin: string): Promise<void>;
    callApi<Response>(apiInput: ICoreLocalApiRequest): Promise<Response>;
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
    initializeConnection(): Promise<void>;
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