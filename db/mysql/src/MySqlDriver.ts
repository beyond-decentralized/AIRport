import { DI } from '@airport/di';
import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType, SQLDataType, STORE_DRIVER } from '@airport/ground-control';
import { IOperationContext, ITransaction, transactional } from '@airport/tower';
import { FieldPacket, OkPacket, QueryOptions, ResultSetHeader, RowDataPacket } from 'mysql2';
import * as mysql from 'mysql2/promise';
import { Connection, Pool } from 'mysql2/promise';
import { DDLManager } from './DDLManager';

/**
 * Created by Papa on 10/16/2020.
 */

export interface IQueryApi {
  query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    sql: string,
  ): Promise<[T, FieldPacket[]]>;

  query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    sql: string,
    values: any | any[] | { [param: string]: any },
  ): Promise<[T, FieldPacket[]]>;

  query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    options: QueryOptions,
  ): Promise<[T, FieldPacket[]]>;

  query<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    options: QueryOptions,
    values: any | any[] | { [param: string]: any },
  ): Promise<[T, FieldPacket[]]>;

  execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    sql: string,
  ): Promise<[T, FieldPacket[]]>;

  execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    sql: string,
    values: any | any[] | { [param: string]: any },
  ): Promise<[T, FieldPacket[]]>;

  execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    options: QueryOptions,
  ): Promise<[T, FieldPacket[]]>;

  execute<T extends RowDataPacket[][] | RowDataPacket[] | OkPacket | OkPacket[] | ResultSetHeader>(
    options: QueryOptions,
    values: any | any[] | { [param: string]: any },
  ): Promise<[T, FieldPacket[]]>;
}

export class MySqlDriver
  extends SqlDriver {

  protected pool: Pool;
  protected queryApi: IQueryApi;
  protected maxValues = 1000000;

  async query(
    queryType: QueryType,
    query: string,
    params: any,
    context: IOperationContext<any, any>,
    saveTransaction?: boolean,
  ): Promise<any> {
    return await this.doQuery(queryType, query, params, this.queryApi, context,
      saveTransaction);
  }

  async doQuery(
    queryType: QueryType,
    query: string,
    params: any,
    connection: IQueryApi,
    context: IOperationContext<any, any>,
    saveTransaction?: boolean,
  ): Promise<any> {
    let nativeParameters = params.map((value) => this.convertValueIn(value));
    console.log(query);
    console.log(nativeParameters);
    const results = await connection.query(query, nativeParameters);

    return results[0];
  }

  initialize(dbName: string): Promise<any> {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      database: 'votecube',
      host: 'localhost',
      password: 'admin',
      queueLimit: 1000,
      user: 'root',
      waitForConnections: true,
    });
    this.queryApi = this.pool;

    return null;
  }

  isServer(): boolean {
    return true;
  }

  async transact(
    transactionalCallback: {
      (
        transaction: ITransaction,
      ): Promise<void>
    },
  ): Promise<void> {
    const connection: Connection = await this.pool.getConnection();
    await connection.beginTransaction();
    const transactionModule = await import('./MySqlTransaction');
    const transaction = new transactionModule.MySqlTransaction(this, this.pool, connection);
    await transactionalCallback(transaction);
  }

  isValueValid(
    value: any,
    sqlDataType: SQLDataType,
  ): boolean {
    throw new Error('Method not implemented.');
  }

  composeTableName(
    schemaName: string,
    tableName: string,
  ): string {
    return `${schemaName}.${tableName}`;
  }

  async doesTableExist(
    schemaName: string,
    tableName: string,
    context: IOperationContext<any, any>,
  ): Promise<boolean> {
    const result = await this.findNative(
      // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
      `select count(1) as count from information_schema.TABLES
where TABLE_SCHEMA = '${schemaName}'
and TABLE_NAME = '${tableName}';`,
      [],
      context,
    );

    return result[0].count == 1;
  }

  async dropTable(
    schemaName: string,
    tableName: string,
    context: IOperationContext<any, any>,
  ): Promise<boolean> {
    await this.findNative(
      `DROP TABLE '${schemaName}'.'${tableName}'`,
      [],
      context,
    );

    return true;
  }

  async findNative(
    sqlQuery: string,
    parameters: any[],
    context: IOperationContext<any, any>,
  ): Promise<any> {
    return await this.query(QueryType.SELECT, sqlQuery, parameters, context);
  }

  async initAllTables(
    context: IOperationContext<any, any>,
  ): Promise<any> {
    let createOperations;
    let createQueries: Promise<any>[] = [];
    let createSql = DDLManager.getCreateDDL();
    await transactional(async () => {
      for (const createSqlStatement of createSql) {
        const createTablePromise = this.query(QueryType.DDL, createSqlStatement,
          [], context, false);
        createQueries.push(createTablePromise);
      }

      await this.initTables(createQueries);
    });
  }

  async initTables(
    createQueries: Promise<any>[],
  ): Promise<void> {
    for (let i = 0; i < createQueries.length; i++) {
      let currentQuery = createQueries[i];
      await currentQuery;
    }
  }

  protected getDialect(): import('@airport/fuel-hydrant-system').SQLDialect {
    return SQLDialect.MYSQL;
  }

  protected async executeNative(
    sql: string,
    parameters: any[],
    context: IOperationContext<any, any>,
  ): Promise<number> {
    return await this.query(QueryType.MUTATE, sql, parameters, context);
  }

  protected convertValueIn(
    value: any,
  ): any {
    switch (typeof value) {
      case 'boolean':
      // return value ? 1 : 0
      case 'number':
      case 'string':
        return value;
      case 'undefined':
        return null;
      case 'object':
        if (!value) {
          return null;
        } else if (value instanceof Date) {
          // return value.getTime()
          return value;
        } else {
          throw new Error(`Unexpected non-date object ${value}`);
        }
      default:
        throw new Error(`Unexpected typeof value: ${typeof value}`);
    }
  }

}

DI.set(STORE_DRIVER, MySqlDriver);
