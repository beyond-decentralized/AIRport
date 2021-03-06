"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const SQLQuery_1 = require("../../sql/core/SQLQuery");
const SqLiteDriver_1 = require("../../db/sqlite/src/SqLiteDriver");
class WebSqlDriver extends SqLiteDriver_1.SqLiteDriver {
    constructor() {
        super();
        this.currentStatementId = 0;
        this.keepAlive = false;
        this.keepAliveCount = 0;
        this.pendingStatements = [];
        this.type = ground_control_1.StoreType.SQLITE_CORDOVA;
    }
    getDialect() {
        return SQLQuery_1.SQLDialect.SQLITE_WEBSQL;
    }
    getBackupLocation(dbFlag) {
        switch (dbFlag) {
            case WebSqlDriver.BACKUP_LOCAL:
                return 2;
            case WebSqlDriver.BACKUP_LIBRARY:
                return 1;
            case WebSqlDriver.BACKUP_DOCUMENTS:
                return 0;
            default:
                throw Error('Invalid backup flag: ' + dbFlag);
        }
    }
    async initialize(dbName) {
        let dbOptions = {
            name: dbName,
            backupFlag: WebSqlDriver.BACKUP_LOCAL,
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
            // console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make
            // sure to install cordova-sqlite-storage in production!')
            this._db = win.openDatabase(dbOptions.name, '1.0', 'terminal', 5 * 1024 * 1024);
        }
    }
    async transact(keepAlive = true) {
        return new Promise((resolve) => {
            if (!this.transaction) {
                this.keepAlive = keepAlive;
            }
            resolve();
        });
    }
    async rollback() {
        if (this.transaction) {
            this.transaction.executeSql('SELECT count(*) FROM ' + ground_control_1.INVALID_TABLE_NAME, []);
        }
        await this.commit();
    }
    async commit() {
        this.keepAlive = false;
        this.keepAliveCount = 0;
        this.transaction = null;
    }
    async query(queryType, query, params = [], saveTransaction = false) {
        return new Promise((resolve, reject) => {
            let id = ++this.currentStatementId;
            this.pendingStatements.push({
                id,
                query,
                queryType,
                params,
                reject,
                resolve
            });
            try {
                if (!this.transaction) {
                    this._db.transaction((tx) => {
                        this.transaction = tx;
                        this.executePendingStatements(tx);
                    }, (err) => {
                        reject(err);
                    }, (done) => {
                        console.log('Transaction finished');
                        // nothing to do
                    });
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    keepTransactionAlive(tx) {
        tx.executeSql('SELECT count(*) FROM npmjs_org___airport__territory__Package', [], (tx) => {
            this.executePendingStatements(tx);
        }, (tx) => {
            this.executePendingStatements(tx);
        });
    }
    executePendingStatements(tx) {
        if (this.pendingStatements.length) {
            let statement = this.pendingStatements.shift();
            console.log(statement.query);
            console.log(statement.params);
            if (this.keepAlive) {
                this.keepAliveCount = 100;
            }
            tx.executeSql(statement.query, statement.params, (tx, res) => {
                let response = this.getReturnValue(statement.queryType, res);
                console.log(response);
                statement.resolve(response);
                this.executePendingStatements(tx);
            }, (tx, err) => {
                statement.reject(err);
                this.executePendingStatements(tx);
            });
        }
        else if (--this.keepAliveCount > 0) {
            this.keepTransactionAlive(tx);
        }
        else {
            this.commit().then();
        }
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
}
exports.WebSqlDriver = WebSqlDriver;
WebSqlDriver.BACKUP_LOCAL = 2;
WebSqlDriver.BACKUP_LIBRARY = 1;
WebSqlDriver.BACKUP_DOCUMENTS = 0;
/*
function runSqlSeries(
    tx,
    sqls,
    parameterss,
    fnum,
    callback
) {
    if (typeof sqls === 'string') {
        sqls = [sqls]
    }
    var totalNumber = sqls.length
    var sqlIndex    = fnum
    if (parameterss && sqls.length == 1 && parameterss.length > 1) {
        //ie one sql statement run many times
        totalNumber = parameterss.length
        sqlIndex    = 0
    }
    if (fnum >= totalNumber) {
        callback(true, 'success - ran ' + fnum + ' sql statements')
        return
    }
    var successFn  = function () {
        runSqlSeries(tx, sqls, parameterss, fnum + 1, callback)
    }
    var errorFn    = function (
        tx,
        error
    ) {
        callback(false, 'Error running function ' + fnum + ' ' + error.message)
    }
    var parameters = []
    if (parameterss) {
        parameters = parameterss[fnum]
    }

    tx.executeSql(sqls[sqlIndex], parameters, successFn, errorFn)
}
*/
//# sourceMappingURL=WebSqlDriver.js.map