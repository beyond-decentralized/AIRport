"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CockroachdbDriver_1;
const ground_control_1 = require("@airport/ground-control");
const typedi_1 = require("typedi");
const SQLQuery_1 = require("../../sql/core/SQLQuery");
const SqLiteDriver_1 = require("../sqLite/SqLiteDriver");
/**
 * Created by Papa on 8/30/2016.
 */
let CockroachdbDriver = CockroachdbDriver_1 = class CockroachdbDriver extends SqLiteDriver_1.SqLiteDriver {
    constructor(airportDb, utils, queries) {
        super(airportDb, utils, queries);
        this.currentStatementId = 0;
        this.pendingStatements = [];
        this.executedResults = [];
        this.type = ground_control_1.StoreType.SQLITE_CORDOVA;
    }
    getDialect() {
        return SQLQuery_1.SQLDialect.SQLITE_WEBSQL;
    }
    getBackupLocation(dbFlag) {
        switch (dbFlag) {
            case CockroachdbDriver_1.BACKUP_LOCAL:
                return 2;
            case CockroachdbDriver_1.BACKUP_LIBRARY:
                return 1;
            case CockroachdbDriver_1.BACKUP_DOCUMENTS:
                return 0;
            default:
                throw Error('Invalid backup flag: ' + dbFlag);
        }
    }
    async initialize(dbName) {
        let dbOptions = {
            name: dbName,
            backupFlag: CockroachdbDriver_1.BACKUP_LOCAL,
            existingDatabase: false
        };
        let win = window;
        if (win.sqlitePlugin) {
            let location = this.getBackupLocation(dbOptions.backupFlag);
            dbOptions.location = location;
            dbOptions.createFromLocation = dbOptions.existingDatabase ? 1 : 0;
            this._db = win.sqlitePlugin.openDatabase(dbOptions);
        }
        else {
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
            this._db = win.openDatabase(dbOptions.name, '1.0', 'database', 5 * 1024 * 1024);
        }
        return await this.initAllTables();
    }
    async startTransaction() {
        return new Promise((resolve, reject) => {
            let failed = false;
            try {
                let completed = false;
                let retunValue;
                if (this.currentTransaction) {
                    throw `Another transaction is already in progress.`;
                }
                this._db.transaction((tx) => {
                    this.currentTransaction = tx;
                    this.keepTransactionAlive(tx);
                }, (err) => {
                    reject(err);
                }, (done) => {
                    if (failed) {
                        return;
                    }
                    if (!completed) {
                        reject('Transaction finished before method completion.');
                    }
                    else {
                        resolve(retunValue);
                    }
                });
            }
            catch (err) {
                this.currentTransaction = null;
                failed = true;
                reject(err);
            }
        });
    }
    async rollbackTransaction() {
        if (this.currentTransaction) {
            this.currentTransaction.executeSql('SELECT count(*) FROM ' + ground_control_1.INVALID_TABLE_NAME, []);
        }
    }
    async commitTransaction() {
        this.currentTransaction = null;
    }
    keepTransactionAlive(tx) {
        tx.executeSql('SELECT count(*) FROM AP_SCHEMAS', [], function (tx, results) {
            if (this.havePendingStatements()) {
                this.executePendingStatements(tx);
            }
            else if (!this.isTransactionDone()) {
                this.keepTransactionAlive(tx);
            }
        });
    }
    havePendingStatements() {
        return !!this.pendingStatements.length;
    }
    executePendingStatements(tx) {
        while (this.havePendingStatements()) {
            let statement = this.pendingStatements.shift();
            console.log(statement.query);
            console.log(statement.params);
            this.currentTransaction.executeSql(statement.query, statement.params, (tx, res) => {
                let response = this.getReturnValue(statement.queryType, res);
                console.log(response);
                this.executedResults.push({
                    id: statement.id,
                    response
                });
            }, (tx, err) => {
                this.executedResults.push({
                    id: statement.id,
                    error: err
                });
            });
        }
    }
    isTransactionDone() {
        return this.currentTransaction === null;
    }
    getExecutedResult(id) {
        for (const result of this.executedResults) {
            if (result.id === id) {
                return result;
            }
        }
        return null;
    }
    getResponse(id, resolve, reject) {
        setTimeout(() => {
            const result = this.getExecutedResult(id);
            if (result) {
                if (result.response) {
                    resolve(result.response);
                }
                else {
                    reject(result.error);
                }
            }
            else {
                this.getResponse(id, resolve, reject);
            }
        }, 50);
    }
    async query(queryType, query, params = [], saveTransaction = false) {
        return new Promise((resolve, reject) => {
            try {
                if (this.currentTransaction) {
                    let id = ++this.currentStatementId;
                    this.pendingStatements.push({
                        id,
                        query,
                        queryType,
                        params,
                    });
                    this.getResponse(id, resolve, reject);
                }
                else {
                    let response;
                    this._db.transaction((tx) => {
                        if (saveTransaction) {
                            this.currentTransaction = tx;
                        }
                        console.log(query);
                        console.log(params);
                        tx.executeSql(query, params, (tx, res) => {
                            console.log(res);
                            response = this.getReturnValue(queryType, res);
                        }, (tx, err) => {
                            reject(err);
                        });
                    }, (err) => {
                        reject(err);
                    }, (done) => {
                        resolve(response);
                    });
                }
            }
            catch (err) {
                reject(err);
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
CockroachdbDriver.BACKUP_LOCAL = 2;
CockroachdbDriver.BACKUP_LIBRARY = 1;
CockroachdbDriver.BACKUP_DOCUMENTS = 0;
CockroachdbDriver = CockroachdbDriver_1 = __decorate([
    typedi_1.Service(ground_control_1.StoreDriverToken)
], CockroachdbDriver);
exports.CockroachdbDriver = CockroachdbDriver;
function runSqlSeries(tx, sqls, parameterss, fnum, callback) {
    if (typeof sqls === 'string') {
        sqls = [sqls];
    }
    var totalNumber = sqls.length;
    var sqlIndex = fnum;
    if (parameterss && sqls.length == 1 && parameterss.length > 1) {
        //ie one sql statement run many times
        totalNumber = parameterss.length;
        sqlIndex = 0;
    }
    if (fnum >= totalNumber) {
        callback(true, "success - ran " + fnum + " sql statements");
        return;
    }
    var successFn = function () {
        runSqlSeries(tx, sqls, parameterss, fnum + 1, callback);
    };
    var errorFn = function (tx, error) {
        callback(false, "Error running function " + fnum + " " + error.message);
    };
    var parameters = [];
    if (parameterss) {
        parameters = parameterss[fnum];
    }
    tx.executeSql(sqls[sqlIndex], parameters, successFn, errorFn);
}
;
//# sourceMappingURL=CockroachDbDriver.js.map