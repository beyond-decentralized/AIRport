import { IApplicationVersion } from '@airport/airspace';
import { IIsolateMessageOut, IApplicationLoader, ILocalAPIServer, IApplicationStore } from '@airport/apron';
import { ICoreLocalApiRequest, ILocalAPIRequest, ILocalAPIResponse } from '@airport/aviation-communication';
import { IContext } from '@airport/direction-indicator';
import { DbDomain, Domain_Name, IAirEntity, IDbApplicationUtils, ISaveResult, ITransactionalConnector, PortableQuery } from '@airport/ground-control';
import { IEntityContext } from '@airport/tarmaq-entity';
import { IQueryContext } from '@airport/tarmaq-query';
import { ITerminalStore } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export interface IIframeTransactionalConnector extends ITransactionalConnector {
    getLatestApplicationVersionMapByFullApplication_Name(applicationName: string): Promise<IApplicationVersion>;
    initializeConnection(): Promise<void>;
    processMessage(message: IIsolateMessageOut<any> | ILocalAPIRequest, origin: string): Promise<void>;
    retrieveDomain(domainName: Domain_Name): Promise<DbDomain>;
}
export declare class IframeTransactionalConnector implements IIframeTransactionalConnector {
    applicationLoader: IApplicationLoader;
    applicationStore: IApplicationStore;
    dbApplicationUtils: IDbApplicationUtils;
    localApiServer: ILocalAPIServer;
    terminalStore: ITerminalStore;
    processMessage(message: IIsolateMessageOut<any> | ILocalAPIRequest, origin: string): Promise<void>;
    callApi(apiInput: ICoreLocalApiRequest): Promise<ILocalAPIResponse>;
    addRepository(context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryContext, cachedSqlQueryId?: number): Observable<E>;
    save<E extends IAirEntity, T = E | E[]>(entity: T, context: IEntityContext): Promise<ISaveResult>;
    saveToDestination<E extends IAirEntity, T = E | E[]>(repositoryDestination: string, entity: T, context?: IContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetLocalIds(portableQuery: PortableQuery, context: IContext): Promise<number[][]>;
    updateValues(portableQuery: PortableQuery, context: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number>;
    getLatestApplicationVersionMapByFullApplication_Name(fullApplication_Name: string): Promise<IApplicationVersion>;
    initializeConnection(): Promise<void>;
    private handleLocalApiRequest;
    private handleDbToIsolateMessage;
    private getCoreFields;
    private sendMessage;
    private sendMessageNoWait;
    private sendObservableMessage;
    private wait;
    private isConnectionInitialized;
    retrieveDomain(domainName: Domain_Name): Promise<DbDomain>;
    onMessage(callback: (message: any) => void): void;
}
//# sourceMappingURL=IFrameTransactionalConnector.d.ts.map