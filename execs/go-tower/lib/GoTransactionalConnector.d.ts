import { IQueryContext } from '@airport/air-control';
import { IContext } from '@airport/di';
import { DistributionStrategy, ISaveResult, ITransactionalConnector, PlatformType, PortableQuery } from '@airport/ground-control';
import { Observable } from 'rxjs';
export declare class GoTransactionalConnector implements ITransactionalConnector {
    dbName: string;
    serverUrl: string;
    init(): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<Observable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, context: IQueryContext<E>, cachedSqlQueryId?: number): Promise<Observable<E>>;
    /**
     * This is a TIQL Insert statement coming from the client.
     * It will have an id of the operation to be invoked, as
     * well as the parameters for this specific operation.
     * The operation will then be looked up from the schema,
     * parsed, cached (if appropriate) and executed.
     *
     * NOTE: some of these operations will be internal
     *
     * In a client Dao this will look like:
     *
     * @Prepared()
     * @Insert(...)
     *
     */
    insert(): void;
    /**
     * @Update(...)
     */
    update(): void;
    /**
     * @Delete(...)
     */
    delete(): void;
    save<E, T = E | E[]>(entity: T, context: IContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, context: IContext): Promise<number[][] | string[][]>;
    updateValues(portableQuery: PortableQuery, context: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number>;
    startTransaction(context: IContext): Promise<boolean>;
    commit(context: IContext): Promise<boolean>;
    rollback(context: IContext): Promise<boolean>;
}
//# sourceMappingURL=GoTransactionalConnector.d.ts.map