var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { QueryType, } from '@airport/ground-control';
import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import pg from 'pg';
import pgConnectionString from 'pg-connection-string';
import { DDLManager } from './DDLManager';
import { Injected } from '@airport/direction-indicator';
const Pool = pg.Pool;
const parse = pgConnectionString.parse;
/**
 * Created by Papa on 11/27/2016.
 */
let PostgreSqlDriver = class PostgreSqlDriver extends SqlDriver {
    composeTableName(applicationName, tableName) {
        return `${applicationName}.${tableName}`;
    }
    async doesTableExist(applicationName, tableName) {
        try {
            const result = await this.pool.query(`SELECT EXISTS (
				SELECT FROM information_application.tables 
				WHERE  table_application = '${applicationName}'
				AND    table_name   = '${tableName}'
				)`);
            return result.rows && !!result.rows.length;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async dropTable(applicationName, tableName, context) {
        await this.pool.query(`DROP TABLE  '${applicationName}'.'${tableName}'`);
        return true;
    }
    async findNative(sqlQuery, parameters, context) {
        let nativeParameters = parameters.map((value) => this.convertValueIn(value));
        return await this.query(QueryType.SELECT, sqlQuery, nativeParameters, context);
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
    isValueValid(value, sqlDataType, context) {
        throw new Error('Method not implemented.');
        // switch (sqlDataType) {
        // 	case SQLDataType.DATE:
        // 	case SQLDataType.NUMBER:
        // }
        // return false
    }
    async query(queryType, query, params, context, saveTransaction) {
        const client = await this.getClient();
        return await this.doQuery(queryType, query, params, client, context, saveTransaction);
    }
    async doQuery(queryType, query, params, client, context, saveTransaction) {
        let nativeParameters = params.map((value) => this.convertValueIn(value));
        console.log(query);
        console.log(nativeParameters);
        const results = await client.query(query, nativeParameters);
        return results.rows;
    }
    async initialize(connectionString) {
        // TODO: make connection secure when needed
        // Number of cores will be 3*3 (or eventually 3*5) but to allow 
        // for scaling of write services
        // only 3 core per Node.js process is allocated
        let numberOfCrdbCores = 3;
        // Best practice - 4 connections per core
        pg.defaults.poolSize = numberOfCrdbCores * 4;
        // Expand $env:appdata environment variable in Windows connection string
        if (connectionString.includes("env:appdata")) {
            connectionString = await connectionString.replace("$env:appdata", process.env.APPDATA);
        }
        // Expand $HOME environment variable in UNIX connection string
        else if (connectionString.includes("HOME")) {
            connectionString = await connectionString.replace("$HOME", process.env.HOME);
        }
        var config = parse(connectionString);
        // config.port = port;
        // config.database = database;
        this.pool = new Pool(config);
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
        return SQLDialect.POSTGRESQL;
    }
    async getClient() {
        return await this.pool;
    }
};
PostgreSqlDriver = __decorate([
    Injected()
], PostgreSqlDriver);
export { PostgreSqlDriver };
//# sourceMappingURL=PostgreSqlDriver.js.map