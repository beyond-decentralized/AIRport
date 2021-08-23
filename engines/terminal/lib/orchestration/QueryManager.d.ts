import { IContext } from '@airport/di';
import { PortableQuery } from '@airport/ground-control';
import { IQueryManager } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export declare class QueryManager implements IQueryManager {
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Observable<E>;
}
//# sourceMappingURL=QueryManager.d.ts.map