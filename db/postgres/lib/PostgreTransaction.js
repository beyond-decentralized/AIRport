import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType } from '@airport/ground-control';
import { transactional } from '@airport/tower';
import pg from 'pg';
import pgConnectionString from 'pg-connection-string';
import { DDLManager } from './DDLManager';
const Pool = pg.Pool;
const parse = pgConnectionString.parse;
export class PostgreTransaction extends SqlDriver {
    constructor(driver, pool, client) {
        super();
        this.driver = driver;
        this.client = client;
        this.pool = pool;
        this.__container__ = driver.__container__;
    }
    async saveTransaction(transaction) {
    }
    async commit() {
        try {
            await this.client.query('COMMIT');
        }
        finally {
            this.client.release();
        }
    }
    async rollback() {
        try {
            await this.client.query('ROLLBACK');
        }
        finally {
            this.client.release();
        }
    }
    async getClient() {
        return await this.client;
    }
    composeTableName(schemaName, tableName) {
        return `${schemaName}.${tableName}`;
    }
    async doesTableExist(schemaName, tableName) {
        try {
            const result = await this.pool.query(`SELECT EXISTS (
				SELECT FROM information_schema.tables 
				WHERE  table_schema = '${schemaName}'
				AND    table_name   = '${tableName}'
				)`);
            return result.rows && !!result.rows.length;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async dropTable(schemaName, tableName, context) {
        await this.pool.query(`DROP TABLE  '${schemaName}'.'${tableName}'`);
        return true;
    }
    async findNative(sqlQuery, parameters, context) {
        let nativeParameters = parameters.map((value) => this.convertValueIn(value));
        return await this.query(QueryType.SELECT, sqlQuery, nativeParameters, context);
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
    async transact(transactionalCallback, context) {
        throw new Error('Cannot use transaction object to start another transaction');
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
    isServer() {
        return true;
    }
    getDialect() {
        return SQLDialect.POSTGRESQL;
    }
}
//# sourceMappingURL=PostgreTransaction.js.map