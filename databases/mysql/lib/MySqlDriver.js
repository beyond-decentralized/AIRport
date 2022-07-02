var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType } from '@airport/ground-control';
import * as mysql from 'mysql2/promise';
import { DDLManager } from './DDLManager';
let MySqlDriver = class MySqlDriver extends SqlDriver {
    constructor() {
        super(...arguments);
        this.maxValues = 1000000;
    }
    composeTableName(applicationName, tableName) {
        return `${applicationName}.${tableName}`;
    }
    async doesTableExist(applicationName, tableName, context) {
        const result = await this.findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `select count(1) as count from information_application.TABLES
where TABLE_APPLICATION = '${applicationName}'
and TABLE_NAME = '${tableName}';`, [], context);
        return result[0].count == 1;
    }
    async dropTable(applicationName, tableName, context) {
        await this.findNative(`DROP TABLE '${applicationName}'.'${tableName}'`, [], context);
        return true;
    }
    async findNative(sqlQuery, parameters, context) {
        return await this.query(QueryType.SELECT, sqlQuery, parameters, context);
    }
    getSelectQuerySuffix(jsonQuery, context) {
        if (jsonQuery.forUpdate) {
            return 'FOR UPDATE';
        }
        return '';
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
    async initAllTables(context) {
        let createOperations;
        let createQueries = [];
        let createSql = DDLManager.getCreateDDL();
        await this.transactionManager.transactInternal(async () => {
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
    isServer() {
        return true;
    }
    getDialect() {
        return SQLDialect.MYSQL;
    }
};
MySqlDriver = __decorate([
    Injected()
], MySqlDriver);
export { MySqlDriver };
//# sourceMappingURL=MySqlDriver.js.map