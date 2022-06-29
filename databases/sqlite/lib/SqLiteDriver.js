import { QueryType } from '@airport/ground-control';
import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
/**
 * Created by Papa on 11/27/2016.
 */
export class SqLiteDriver extends SqlDriver {
    constructor() {
        super();
        this.maxValues = 999;
    }
    composeTableName(applicationName, tableName) {
        return `${applicationName}__${tableName}`;
    }
    async doesTableExist(applicationName, tableName, context) {
        const matchingTableNames = await this.findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `SELECT
	tbl_name
from
	sqlite_master
WHERE
	type = 'table'
	AND tbl_name = '${applicationName}__${tableName}'`, [], context);
        return this.getNumberOfRows(matchingTableNames) === 1;
    }
    getSelectQuerySuffix(jsonQuery, context) {
        return '';
    }
    getNumberOfRows(result) {
        return this.getRows(result).length;
    }
    async dropTable(applicationName, tableName, context) {
        const matchingTableNames = await this.findNative(`DROP TABLE '${applicationName}__${tableName}'`, [], context);
        return matchingTableNames.length === 1;
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
    async initTables(createQueries) {
        for (let i = 0; i < createQueries.length; i++) {
            let currentQuery = createQueries[i];
            await currentQuery;
        }
    }
    getDialect() {
        return SQLDialect.SQLITE;
    }
    isServer() {
        return false;
    }
}
//# sourceMappingURL=SqLiteDriver.js.map