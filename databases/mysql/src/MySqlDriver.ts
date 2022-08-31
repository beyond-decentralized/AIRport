
import {
  Injected
} from '@airport/direction-indicator'
import {
  SQLDialect,
  SqlDriver
} from '@airport/fuel-hydrant-system';
import { IFuelHydrantContext } from '@airport/fuel-hydrant-system';
import {
  JsonQuery,
  QueryType,
  SQLDataType
} from '@airport/ground-control';
import {
  IOperationContext
} from '@airport/terminal-map';
import {
  FieldPacket,
  OkPacket,
  QueryOptions,
  ResultSetHeader,
  RowDataPacket
} from 'mysql2';
import * as mysql from 'mysql2/promise';
import { Pool } from 'mysql2/promise';
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

@Injected()
export class MySqlDriver
  extends SqlDriver {

  protected pool: Pool;
  protected queryApi: IQueryApi;
  protected maxValues = 1000000;

  composeTableName(
    applicationName: string,
    tableName: string,
  ): string {
    return `${applicationName}.${tableName}`;
  }

  async doesTableExist(
    applicationName: string,
    tableName: string,
    context: IOperationContext,
  ): Promise<boolean> {
    const result = await this.findNative(
      // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
      `SELECT
  count(1) AS count
FROM
  information_application.TABLES
WHERE
  TABLE_APPLICATION = '${applicationName}'
  AND TABLE_NAME = '${tableName}';`,
      [],
      context,
    );

    return result[0].count == 1;
  }

  async dropTable(
    applicationName: string,
    tableName: string,
    context: IOperationContext,
  ): Promise<boolean> {
    await this.findNative(
      `DROP TABLE '${applicationName}'.'${tableName}'`,
      [],
      context,
    );

    return true;
  }

  async findNative(
    sqlQuery: string,
    parameters: any[],
    context: IOperationContext,
  ): Promise<any> {
    return await this.query(QueryType.SELECT, sqlQuery, parameters, context);
  }

  getSelectQuerySuffix(
    jsonQuery: JsonQuery,
    context: IFuelHydrantContext
  ): string {
    if (jsonQuery.forUpdate) {
      return 'FOR UPDATE'
    }
    return ''
  }

  protected async executeNative(
    sql: string,
    parameters: any[],
    context: IOperationContext,
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

  isValueValid(
    value: any,
    sqlDataType: SQLDataType,
  ): boolean {
    throw new Error('Method not implemented.');
  }

  async query(
    queryType: QueryType,
    query: string,
    params: any,
    context: IOperationContext,
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
    context: IOperationContext,
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

  async initAllTables(
    context: IOperationContext,
  ): Promise<any> {
    let createOperations;
    let createQueries: Promise<any>[] = [];
    let createSql = DDLManager.getCreateDDL();
    await this.transactionManager.transactInternal(async () => {
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

}

