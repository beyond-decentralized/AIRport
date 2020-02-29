import { QueryType } from '@airport/ground-control';
import { transactional } from '@airport/tower';
import { SqlDriver } from '../SqlDriver';
import { DDLManager } from './DDLManager';
/**
 * Created by Papa on 11/27/2016.
 */
export class PostgreSqlDriver extends SqlDriver {
    async doesTableExist(tableName) {
        throw new Error(`Not implemented`);
    }
    async findNative(sqlQuery, parameters) {
        let nativeParameters = parameters.map((value) => this.convertValueIn(value));
        return await this.query(QueryType.SELECT, sqlQuery, nativeParameters);
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
}
//# sourceMappingURL=PostgreSqlDriver.js.map