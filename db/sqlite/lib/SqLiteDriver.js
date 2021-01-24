import { QueryType, SQLDataType } from '@airport/ground-control';
import { SqlDriver } from '@airport/fuel-hydrant-system';
/**
 * Created by Papa on 11/27/2016.
 */
export class SqLiteDriver extends SqlDriver {
    constructor() {
        super();
        this.maxValues = 999;
    }
    composeTableName(schemaName, tableName) {
        return `${schemaName}__${tableName}`;
    }
    async doesTableExist(schemaName, tableName, context) {
        const matchingTableNames = await this.findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `SELECT
	tbl_name
from
	sqlite_master
WHERE
	type = 'table'
	AND tbl_name = '${schemaName}__${tableName}'`, [], context);
        return matchingTableNames.length === 1;
    }
    async dropTable(schemaName, tableName, context) {
        const matchingTableNames = await this.findNative(`DROP TABLE '${schemaName}__${tableName}'`, [], context);
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
    isValueValid(value, sqlDataType) {
        switch (sqlDataType) {
            case SQLDataType.DATE:
            case SQLDataType.NUMBER:
        }
        return false;
    }
    async initTables(createQueries) {
        for (let i = 0; i < createQueries.length; i++) {
            let currentQuery = createQueries[i];
            await currentQuery;
        }
    }
}
//# sourceMappingURL=SqLiteDriver.js.map