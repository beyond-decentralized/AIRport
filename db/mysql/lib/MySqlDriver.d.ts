import { SqlDriver } from '@airport/fuel-hydrant-system';
import { ITransaction, QueryType, SQLDataType } from '@airport/ground-control';
/**
 * Created by Papa on 10/16/2020.
 */
export declare class MySqlDriver extends SqlDriver {
    private pool;
    query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    initialize(dbName: string): Promise<any>;
    transact(keepAlive?: boolean): Promise<ITransaction>;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
    doesTableExist(schemaName: string, tableName: string): Promise<boolean>;
    dropTable(schemaName: string, tableName: string): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    initAllTables(): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
    protected getDialect(): import('@airport/fuel-hydrant-system').SQLDialect;
    protected executeNative(sql: string, parameters: any[]): Promise<number>;
    protected convertValueIn(value: any): number | string;
}
//# sourceMappingURL=MySqlDriver.d.ts.map