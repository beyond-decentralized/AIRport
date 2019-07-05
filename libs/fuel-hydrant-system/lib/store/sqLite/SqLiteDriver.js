"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const SqlDriver_1 = require("../SqlDriver");
/**
 * Created by Papa on 11/27/2016.
 */
class SqLiteDriver extends SqlDriver_1.SqlDriver {
    constructor() {
        super();
        this.maxValues = 999;
    }
    async doesTableExist(tableName) {
        const matchingTableNames = await this.findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `SELECT tbl_name from sqlite_master WHERE type = '${tableName}'`, []);
        return matchingTableNames.length === 1;
    }
    async dropTable(tableName) {
        const matchingTableNames = await this.findNative(`DROP TABLE '${tableName}'`, []);
        return matchingTableNames.length === 1;
    }
    async findNative(sqlQuery, parameters) {
        let nativeParameters = parameters.map((value) => this.convertValueIn(value));
        return await this.query(ground_control_1.QueryType.SELECT, sqlQuery, nativeParameters);
    }
    async executeNative(sql, parameters) {
        return await this.query(ground_control_1.QueryType.MUTATE, sql, parameters);
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
    async initTables(createQueries) {
        for (let i = 0; i < createQueries.length; i++) {
            let currentQuery = createQueries[i];
            await currentQuery;
        }
    }
}
exports.SqLiteDriver = SqLiteDriver;
//# sourceMappingURL=SqLiteDriver.js.map