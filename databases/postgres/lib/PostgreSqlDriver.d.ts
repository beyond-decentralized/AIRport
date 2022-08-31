import { JsonQuery, QueryType, SQLDataType } from '@airport/ground-control';
import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import pg from 'pg';
import { IOperationContext } from '@airport/terminal-map';
import { IFuelHydrantContext } from '@airport/fuel-hydrant-system';
/**
 * Created by Papa on 11/27/2016.
 */
export declare class PostgreSqlDriver extends SqlDriver {
    pool: pg.Pool;
    composeTableName(applicationName: string, tableName: string): string;
    doesTableExist(applicationName: string, tableName: string): Promise<boolean>;
    dropTable(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext): Promise<any[]>;
    getSelectQuerySuffix(jsonQuery: JsonQuery, context: IFuelHydrantContext): string;
    protected executeNative(sql: string, parameters: any[], context: IOperationContext): Promise<number>;
    protected convertValueIn(value: any): number | string;
    isValueValid(value: any, sqlDataType: SQLDataType, context: IOperationContext): boolean;
    query(queryType: QueryType, query: string, params: any, context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    doQuery(queryType: QueryType, query: string, params: any, client: pg.PoolClient | pg.Pool, context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    initialize(connectionString: string): Promise<void>;
    initAllTables(context: IOperationContext): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
    protected getDialect(): SQLDialect;
    protected getClient(): Promise<pg.PoolClient | pg.Pool>;
}
//# sourceMappingURL=PostgreSqlDriver.d.ts.map