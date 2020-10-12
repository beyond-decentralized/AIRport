"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const tower_1 = require("@airport/tower");
const fuel_hydrant_system_1 = require("@airport/fuel-hydrant-system");
const DDLManager_1 = require("./DDLManager");
/**
 * Created by Papa on 11/27/2016.
 */
class MySqlDriver extends fuel_hydrant_system_1.SqlDriver {
    async doesTableExist(schemaName, tableName) {
        const matchingTableNames = await this.findNative(
        // ` SELECT tbl_name, sql from sqlite_master WHERE type = '${tableName}'`,
        `select * from information_schema.TABLES
where TABLE_SCHEMA = '${schemaName}'
and TABLE_NAME = '${tableName}';`, []);
        return matchingTableNames.length === 1;
    }
    async findNative(sqlQuery, parameters) {
        let nativeParameters = parameters.map((value) => this.convertValueIn(value));
        return await this.query(ground_control_1.QueryType.SELECT, sqlQuery, nativeParameters);
    }
    async initAllTables() {
        let createOperations;
        let createQueries = [];
        let createSql = DDLManager_1.DDLManager.getCreateDDL();
        await tower_1.transactional(async () => {
            for (const createSqlStatement of createSql) {
                const createTablePromise = this.query(ground_control_1.QueryType.DDL, createSqlStatement, [], false);
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
}
exports.MySqlDriver = MySqlDriver;
//# sourceMappingURL=MySqlDriver.js.map