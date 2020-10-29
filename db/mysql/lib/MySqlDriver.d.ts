import { SqlDriver } from '@airport/fuel-hydrant-system';
import { ITransaction, QueryType, SQLDataType } from '@airport/ground-control';
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
    query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    doQuery(queryType: QueryType, query: string, params: any, connection: IQueryApi, saveTransaction?: boolean): Promise<any>;
    initialize(dbName: string): Promise<any>;
    numFreeConnections(): number;
    isServer(): boolean;
    transact(keepAlive?: boolean): Promise<ITransaction>;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
    doesTableExist(schemaName: string, tableName: string): Promise<boolean>;
    dropTable(schemaName: string, tableName: string): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[]): Promise<any>;
    initAllTables(): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
    protected getDialect(): import('@airport/fuel-hydrant-system').SQLDialect;
    protected executeNative(sql: string, parameters: any[]): Promise<number>;
    protected convertValueIn(value: any): any;
}
//# sourceMappingURL=MySqlDriver.d.ts.map