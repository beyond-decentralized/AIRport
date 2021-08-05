import { DI } from '@airport/di';
import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType, STORE_DRIVER } from '@airport/ground-control';
import { transactional } from '@airport/tower';
import * as mysql from 'mysql2/promise';
import { DDLManager } from './DDLManager';
export class MySqlDriver extends SqlDriver {
    constructor() {
        super(...arguments);
        this.maxValues = 1000000;
    }
    composeTableName(schemaName, tableName) {
        return `${schemaName}.${tableName}`;
    }
    async doesTableExist(schemaName, tableName, context) {
        const result = await this.findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `select count(1) as count from information_schema.TABLES
where TABLE_SCHEMA = '${schemaName}'
and TABLE_NAME = '${tableName}';`, [], context);
        return result[0].count == 1;
    }
    async dropTable(schemaName, tableName, context) {
        await this.findNative(`DROP TABLE '${schemaName}'.'${tableName}'`, [], context);
        return true;
    }
    async findNative(sqlQuery, parameters, context) {
        return await this.query(QueryType.SELECT, sqlQuery, parameters, context);
    }
    async executeNative(sql, parameters, context) {
        return await this.query(QueryType.MUTATE, sql, parameters, context);
    }
    convertValueIn(value) {
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
                }
                else if (value instanceof Date) {
                    // return value.getTime()
                    return value;
                }
                else {
                    throw new Error(`Unexpected non-date object ${value}`);
                }
            default:
                throw new Error(`Unexpected typeof value: ${typeof value}`);
        }
    }
    isValueValid(value, sqlDataType) {
        throw new Error('Method not implemented.');
    }
    async query(queryType, query, params, context, saveTransaction) {
        return await this.doQuery(queryType, query, params, this.queryApi, context, saveTransaction);
    }
    async doQuery(queryType, query, params, connection, context, saveTransaction) {
        let nativeParameters = params.map((value) => this.convertValueIn(value));
        console.log(query);
        console.log(nativeParameters);
        const results = await connection.query(query, nativeParameters);
        return results[0];
    }
    initialize(dbName) {
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
    async transact(transactionalCallback) {
        const connection = await this.pool.getConnection();
        await connection.beginTransaction();
        const transactionModule = await import('./MySqlTransaction');
        const transaction = new transactionModule.MySqlTransaction(this, this.pool, connection);
        await transactionalCallback(transaction);
    }
    async initAllTables(context) {
        let createOperations;
        let createQueries = [];
        let createSql = DDLManager.getCreateDDL();
        await transactional(async () => {
            for (const createSqlStatement of createSql) {
                const createTablePromise = this.query(QueryType.DDL, createSqlStatement, [], context, false);
                createQueries.push(createTablePromise);
            }
            await this.initTables(createQueries);
        });
    }
    async initTables(createQueries) {
        for (let i = 0; i < createQueries.length; i++) {
            let currentQuery = createQueries[i];
            await currentQuery;
        }
    }
    getDialect() {
        return SQLDialect.MYSQL;
    }
    isServer() {
        return true;
    }
}
DI.set(STORE_DRIVER, MySqlDriver);
//# sourceMappingURL=MySqlDriver.js.map