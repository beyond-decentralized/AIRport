import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType, SQLDataType } from '@airport/ground-control';
import { ITransactionHistory } from '@airport/holding-pattern-runtime';
import { ICredentials, IOperationContext, ITransaction } from '@airport/terminal-map';
import pg from 'pg';
import { PostgreSqlDriver } from './PostgreSqlDriver';
export declare class PostgreTransaction extends SqlDriver implements ITransaction {
    private driver;
    private client;
    credentials: ICredentials;
    isSync: boolean;
    pool: pg.Pool;
    transactionHistory: ITransactionHistory;
    constructor(driver: PostgreSqlDriver, pool: pg.Pool, client: pg.PoolClient);
    saveTransaction(transaction: ITransactionHistory): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    protected getClient(): Promise<pg.PoolClient | pg.Pool>;
    composeTableName(applicationName: string, tableName: string): string;
    doesTableExist(applicationName: string, tableName: string): Promise<boolean>;
    dropTable(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext): Promise<any[]>;
    protected executeNative(sql: string, parameters: any[], context: IOperationContext): Promise<number>;
    protected convertValueIn(value: any): number | string;
    isValueValid(value: any, sqlDataType: SQLDataType, context: IOperationContext): boolean;
    query(queryType: QueryType, query: string, params: any, context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    doQuery(queryType: QueryType, query: string, params: any, client: pg.PoolClient | pg.Pool, context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    initialize(connectionString: string): Promise<void>;
    initAllTables(context: IOperationContext): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
    isServer(): boolean;
    protected getDialect(): SQLDialect;
}
//# sourceMappingURL=PostgreTransaction.d.ts.map