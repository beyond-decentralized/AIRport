import { DI } from '@airport/di';
import { SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType, STORE_DRIVER } from '@airport/ground-control';
import { transactional } from '@airport/tower';
import * as mysql from 'mysql2/promise';
import { DDLManager } from './DDLManager';
import { MySqlTransaction } from './MySqlTransaction';
/**
 * Created by Papa on 10/16/2020.
 */
export class MySqlDriver extends SqlDriver {
    query(queryType, query, params, saveTransaction) {
        throw new Error('Method not implemented.');
    }
    initialize(dbName) {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: dbName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        return null;
    }
    async transact(keepAlive) {
        const connection = await this.pool.getConnection();
        await connection.beginTransaction();
        return new MySqlTransaction(this, this.pool, connection);
    }
    isValueValid(value, sqlDataType) {
        throw new Error('Method not implemented.');
    }
    async doesTableExist(schemaName, tableName) {
        const matchingTableNames = await this.findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `select * from information_schema.TABLES
where TABLE_SCHEMA = '${schemaName}'
and TABLE_NAME = '${tableName}';`, []);
        return matchingTableNames.length === 1;
    }
    async dropTable(schemaName, tableName) {
        const matchingTableNames = await this.findNative(`DROP TABLE '${schemaName}.${tableName}'`, []);
        return matchingTableNames.length === 1;
    }
    async findNative(sqlQuery, parameters) {
        let nativeParameters = parameters.map((value) => this.convertValueIn(value));
        return await this.query(QueryType.SELECT, sqlQuery, nativeParameters);
    }
    async initAllTables() {
        let createOperations;
        let createQueries = [];
        let createSql = DDLManager.getCreateDDL();
        await transactional(async () => {
            for (const createSqlStatement of createSql) {
                const createTablePromise = this.query(QueryType.DDL, createSqlStatement, [], false);
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
        throw new Error('Method not implemented.');
    }
    async executeNative(sql, parameters) {
        return await this.query(QueryType.MUTATE, sql, parameters);
    }
    convertValueIn(value) {
        switch (typeof value) {
            case 'boolean':
                return value ? 1 : 0;
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
                    return value.getTime();
                }
                else {
                    throw new Error(`Unexpected non-date object ${value}`);
                }
            default:
                throw new Error(`Unexpected typeof value: ${typeof value}`);
        }
    }
}
DI.set(STORE_DRIVER, MySqlDriver);
//# sourceMappingURL=MySqlDriver.js.map