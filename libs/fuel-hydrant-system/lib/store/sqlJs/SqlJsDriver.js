"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const SQLQuery_1 = require("../../sql/core/SQLQuery");
const SqLiteDriver_1 = require("../sqLite/SqLiteDriver");
class SqlJsDriver extends SqLiteDriver_1.SqLiteDriver {
    constructor() {
        super();
        this.type = ground_control_1.StoreType.SQLJS;
    }
    getDialect() {
        return SQLQuery_1.SQLDialect.SQLITE_SQLJS;
    }
    async initialize() {
        if (typeof SQL !== 'undefined') {
            this._db = new SQL.Database();
        }
        else {
            let sql = require('sql.js');
            this._db = new sql.Database();
        }
        return await this.initAllTables();
    }
    async startTransaction() {
        this._db.exec('BEGIN TRANSACTION;');
        this.currentTransaction = true;
    }
    async commitTransaction() {
        try {
            this._db.exec('COMMIT;');
        }
        finally {
            this.currentTransaction = false;
        }
    }
    async rollbackTransaction() {
        try {
            this._db.exec('ROLLBACK;');
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
}
exports.SqlJsDriver = SqlJsDriver;
di_1.DI.set(ground_control_1.STORE_DRIVER, SqlJsDriver);
//# sourceMappingURL=SqlJsDriver.js.map