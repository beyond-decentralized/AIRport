import { ApplicationMap, PortableQuery, SyncApplicationMap } from '@airport/ground-control';
import { Subject } from 'rxjs';
/**
 * Created by shamsutdinov.artem on 8/8/2016.
 */
export interface IActiveQueries<SQLQuery extends IFieldMapped> {
    queries: Map<PortableQuery, CachedSQLQuery<SQLQuery>>;
    add(portableQuery: PortableQuery, cachedSqlQuery: CachedSQLQuery<SQLQuery>): void;
    remove(portableQuery: PortableQuery): void;
    markQueriesToRerun(applicationMap: SyncApplicationMap): void;
    rerunQueries(): void;
}
export declare class ActiveQueries<SQLQuery extends IFieldMapped> implements IActiveQueries<SQLQuery> {
    queries: Map<PortableQuery, CachedSQLQuery<SQLQuery>>;
    add(portableQuery: PortableQuery, cachedSqlQuery: CachedSQLQuery<SQLQuery>): void;
    remove(portableQuery: PortableQuery): void;
    markQueriesToRerun(applicationMap: SyncApplicationMap): void;
    rerunQueries(): void;
}
export interface CachedSQLQuery<SQLQuery extends IFieldMapped> {
    parameters: any[];
    portableQuery: PortableQuery;
    resultsSubject: Subject<any>;
    rerun: boolean;
    runQuery: Function;
    sqlQuery: SQLQuery;
    sql: string;
}
export interface IFieldMapped {
    getFieldMap(): ApplicationMap;
}
//# sourceMappingURL=ActiveQueries.d.ts.map