"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const SQLQuery_1 = require("../../sql/core/SQLQuery");
const SqLiteDriver_1 = require("../sqLite/SqLiteDriver");
let SqlJsDriver = class SqlJsDriver extends SqLiteDriver_1.SqLiteDriver {
    constructor(airportDb, utils, queries) {
        super(airportDb, utils, queries);
        this.type = ground_control_1.StoreType.SQLJS;
    }
    getDialect() {
        return SQLQuery_1.SQLDialect.SQLITE_SQLJS;
    }
    async initialize() {
        if (typeof SQL !== "undefined") {
            this._db = new SQL.Database();
        }
        else {
            let sql = require('sql.js');
            this._db = new sql.Database();
        }
        return await this.initAllTables();
    }
    async startTransaction() {
        this._db.exec("BEGIN TRANSACTION;");
        this.currentTransaction = true;
    }
    async commitTransaction() {
        try {
            this._db.exec("COMMIT;");
        }
        finally {
            this.currentTransaction = false;
        }
    }
    async rollbackTransaction() {
        try {
            this._db.exec("ROLLBACK;");
        }
        finally {
            this.currentTransaction = false;
        }
    }
    async query(queryType, query, params = [], saveTransaction = false) {
        return new Promise((resolve, reject) => {
            let stmt;
            try {
                if (!['TQ_BOOLEAN_FIELD_CHANGE', 'TQ_DATE_FIELD_CHANGE', 'TQ_NUMBER_FIELD_CHANGE', 'TQ_STRING_FIELD_CHANGE',
                    'TQ_ENTITY_CHANGE', 'TQ_ENTITY_WHERE_CHANGE', 'TQ_TRANSACTION'].some((deltaTableName) => {
                    return query.indexOf(deltaTableName) > -1;
                })) {
                    console.log(query);
                    console.log(params);
                }
                stmt = this._db.prepare(query);
                stmt.bind(params);
                let results = [];
                while (stmt.step()) {
                    results.push(stmt.get());
                }
                resolve(results);
            }
            catch (error) {
                reject(error);
            }
            finally {
                if (stmt) {
                    stmt.free();
                }
            }
        });
    }
    getReturnValue(queryType, response) {
        switch (queryType) {
            case ground_control_1.QueryType.MUTATE:
                return response.rowsAffected;
            case ground_control_1.QueryType.SELECT:
                return response.rows;
            default:
                return null;
        }
    }
    handleError(error) {
        throw error;
    }
};
SqlJsDriver = __decorate([
    typedi_1.Service(ground_control_1.StoreDriverToken)
], SqlJsDriver);
exports.SqlJsDriver = SqlJsDriver;
//# sourceMappingURL=SqlJsDriver.js.map