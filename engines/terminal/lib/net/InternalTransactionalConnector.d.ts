import { ILocalAPIRequest } from '@airport/aviation-communication';
import { IContext } from '@airport/direction-indicator';
import { ISaveResult, ITransactionalConnector, PortableQuery } from '@airport/ground-control';
import { ITerminalStore, ITransactionalServer } from '@airport/terminal-map';
import { Observable } from 'rxjs';
import { IAirEntity } from '@airport/holding-pattern';
import { IQueryContext } from '@airport/tarmaq-query';
import { IEntityContext } from '@airport/tarmaq-entity';
export declare class InternalTransactionalConnector implements ITransactionalConnector {
    terminalStore: ITerminalStore;
    transactionalServer: ITransactionalServer;
    callApi<Response>(_: ILocalAPIRequest): Promise<Response>;
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
    onMessage(callback: (message: any) => void): void;
}
export declare function injectTransactionalConnector(): void;
//# sourceMappingURL=InternalTransactionalConnector.d.ts.map