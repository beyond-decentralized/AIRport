"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const tower_1 = require("@airport/tower");
const SqlDriver_1 = require("../SqlDriver");
const DDLManager_1 = require("./DDLManager");
/**
 * Created by Papa on 11/27/2016.
 */
class PostgreSqlDriver extends SqlDriver_1.SqlDriver {
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
                    throw `Unexpected non-date object ${value}`;
                }
            default:
                throw `Unexpected typeof value: ${typeof value}`;
        }
    }
    async initAllTables() {
        let createOperations;
        let createQueries = [];
        let createSql = DDLManager_1.DDLManager.getCreateDDL();
        for (const createSqlStatement of createSql) {
            const createTablePromise = this.query(ground_control_1.QueryType.DDL, createSqlStatement, [], false);
            createQueries.push(createTablePromise);
        }
        await this.initTables(createQueries);
    }
    async initTables(createQueries) {
        for (let i = 0; i < createQueries.length; i++) {
            let currentQuery = createQueries[i];
            await currentQuery;
        }
    }
}
__decorate([
    tower_1.Transactional()
], PostgreSqlDriver.prototype, "initAllTables", null);
exports.PostgreSqlDriver = PostgreSqlDriver;
//# sourceMappingURL=PostgreSqlDriver.js.map