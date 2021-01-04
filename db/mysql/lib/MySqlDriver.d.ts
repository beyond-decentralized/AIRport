import { SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType, SQLDataType } from '@airport/ground-control';
import { IOperationContext, ITransaction } from '@airport/tower';
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
    query(queryType: QueryType, query: string, params: any, context: IOperationContext<any, any>, saveTransaction?: boolean): Promise<any>;
    doQuery(queryType: QueryType, query: string, params: any, connection: IQueryApi, context: IOperationContext<any, any>, saveTransaction?: boolean): Promise<any>;
    initialize(dbName: string): Promise<any>;
    isServer(): boolean;
    transact(transactionalCallback: {
        (transaction: ITransaction): Promise<void>;
    }): Promise<void>;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
    composeTableName(schemaName: string, tableName: string): string;
    doesTableExist(schemaName: string, tableName: string, context: IOperationContext<any, any>): Promise<boolean>;
    dropTable(schemaName: string, tableName: string, context: IOperationContext<any, any>): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext<any, any>): Promise<any>;
    initAllTables(context: IOperationContext<any, any>): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
    protected getDialect(): import('@airport/fuel-hydrant-system').SQLDialect;
    protected executeNative(sql: string, parameters: any[], context: IOperationContext<any, any>): Promise<number>;
    protected convertValueIn(value: any): any;
}
//# sourceMappingURL=MySqlDriver.d.ts.map