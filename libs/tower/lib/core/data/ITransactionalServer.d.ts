import { IContext } from '@airport/di';
import { DistributionStrategy, PlatformType, PortableQuery } from '@airport/ground-control';
import { Observable } from 'rxjs';
import { ICredentials } from '@airport/terminal-map';
export interface ITransactionalServer {
    init(context?: IContext): Promise<void>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy, credentials: ICredentials, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<Observable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, cachedSqlQueryId?: number): Promise<Observable<E>>;
    save<E>(entity: E, credentials: ICredentials, context: IContext): Promise<number>;
    insertValues(portableQuery: PortableQuery, credentials: ICredentials, context: IContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, credentials: ICredentials, context: IContext): Promise<number[] | string[] | number[][] | string[][]>;
    updateValues(portableQuery: PortableQuery, credentials: ICredentials, context: IContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, credentials: ICredentials, context: IContext): Promise<number>;
}
//# sourceMappingURL=ITransactionalServer.d.ts.map