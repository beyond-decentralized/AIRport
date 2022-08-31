import { SqlDriver } from '@airport/fuel-hydrant-system';
import { IFuelHydrantContext } from '@airport/fuel-hydrant-system';
import { JsonQuery, QueryType, SQLDataType } from '@airport/ground-control';
import { IOperationContext } from '@airport/terminal-map';
import { FieldPacket, OkPacket, QueryOptions, ResultSetHeader, RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
/**
 * Created by Papa on 10/16/2020.
 */
export interface IQueryApi {
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(sql: string): Promise<[T, FieldPacket[]]>;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(sql: string, values: any | any[] | {
        [param: string]: any;
    }): Promise<[T, FieldPacket[]]>;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(options: QueryOptions): Promise<[T, FieldPacket[]]>;
    query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(options: QueryOptions, values: any | any[] | {
        [param: string]: any;
    }): Promise<[T, FieldPacket[]]>;
    execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(sql: string): Promise<[T, FieldPacket[]]>;
    execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(sql: string, values: any | any[] | {
        [param: string]: any;
    }): Promise<[T, FieldPacket[]]>;
    execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(options: QueryOptions): Promise<[T, FieldPacket[]]>;
    execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(options: QueryOptions, values: any | any[] | {
        [param: string]: any;
    }): Promise<[T, FieldPacket[]]>;
}
export declare class MySqlDriver extends SqlDriver {
    protected pool: Pool;
    protected queryApi: IQueryApi;
    protected maxValues: number;
    composeTableName(applicationName: string, tableName: string): string;
    doesTableExist(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    dropTable(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext): Promise<any>;
    getSelectQuerySuffix(jsonQuery: JsonQuery, context: IFuelHydrantContext): string;
    protected executeNative(sql: string, parameters: any[], context: IOperationContext): Promise<number>;
    protected convertValueIn(value: any): any;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
    query(queryType: QueryType, query: string, params: any, context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    doQuery(queryType: QueryType, query: string, params: any, connection: IQueryApi, context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    initialize(dbName: string): Promise<any>;
    initAllTables(context: IOperationContext): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
    protected getDialect(): import('@airport/fuel-hydrant-system').SQLDialect;
}
//# sourceMappingURL=MySqlDriver.d.ts.map