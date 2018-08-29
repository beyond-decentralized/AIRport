import { QuerySubject } from '@airport/air-control';
import { PortableQuery, SyncSchemaMap } from "@airport/ground-control";
import { SQLQuery } from '../sql/core/SQLQuery';
/**
 * Created by shamsutdinov.artem on 8/8/2016.
 */
export interface IActiveQueries {
    queries: Map<PortableQuery, CachedSQLQuery>;
    add(portableQuery: PortableQuery, cachedSqlQuery: CachedSQLQuery): void;
    remove(portableQuery: PortableQuery): void;
    markQueriesToRerun(schemaMap: SyncSchemaMap): void;
    rerunQueries(): void;
}
export declare class ActiveQueries implements IActiveQueries {
    queries: Map<PortableQuery, CachedSQLQuery>;
    add(portableQuery: PortableQuery, cachedSqlQuery: CachedSQLQuery): void;
    remove(portableQuery: PortableQuery): void;
    markQueriesToRerun(schemaMap: SyncSchemaMap): void;
    rerunQueries(): void;
}
export interface CachedSQLQuery {
    parameters: any[];
    portableQuery: PortableQuery;
    resultsSubject: QuerySubject<any>;
    rerun: boolean;
    runQuery: Function;
    sqlQuery: SQLQuery<any>;
    sql: string;
}