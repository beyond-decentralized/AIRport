import { DI } from '@airport/di';
import { INVALID_TABLE_NAME, QueryType, StoreType, STORE_DRIVER } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
export class WebSqlDriver extends SqLiteDriver {
    constructor() {
        super();
        this.type = StoreType.WEB_SQL;
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
    async initialize(dbName, context) {
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
    async transact(transactionalCallback) {
        const transactionModule = await import('./WebSqlTransaction');
        const transaction = new transactionModule.WebSqlTransaction(this);
        await transactionalCallback(transaction);
        let win = window;
        if (win.sqlitePlugin) {
            this._db.executeSql('BEGIN TRANSACTION;');
        }
        else {
            this._db.transaction(() => {
                transactionalCallback(transaction);
            });
        }
    }
    async rollback() {
        let win = window;
        if (win.sqlitePlugin) {
            this._db.executeSql('ROLLBACK TRANSACTION;');
        }
        else {
            this._db.executeSql('SELECT count(*) FROM ' + INVALID_TABLE_NAME, []);
        }
    }
    async commit() {
        let win = window;
        if (win.sqlitePlugin) {
            this._db.executeSql('COMMIT TRANSACTION;');
        }
        else {
            // Nothing to do
        }
    }
    async query(queryType, query, params = [], context, saveTransaction = false) {
        return new Promise((resolve, reject) => {
            try {
                this._db.transaction(function (tx) {
                    if (!['TQ_BOOLEAN_FIELD_CHANGE', 'TQ_DATE_FIELD_CHANGE', 'TQ_NUMBER_FIELD_CHANGE', 'TQ_STRING_FIELD_CHANGE',
                        'TQ_ENTITY_CHANGE', 'TQ_ENTITY_WHERE_CHANGE', 'TQ_TRANSACTION'].some((deltaTableName) => {
                        return query.indexOf(deltaTableName) > -1;
                    })) {
                        console.log(query);
                        console.log(params);
                    }
                    tx.executeSql(query, params, function (_tx, results) {
                        var len = results.rows.length, i;
                        const data = [];
                        for (i = 0; i < len; i++) {
                            data.push(results.rows.item(i));
                        }
                        resolve(results);
                    }, reject);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    getReturnValue(queryType, response) {
        switch (queryType) {
            case QueryType.MUTATE:
                return response.rowsAffected;
            case QueryType.SELECT:
                return response.rows;
            default:
                return null;
        }
    }
}
WebSqlDriver.BACKUP_LOCAL = 2;
WebSqlDriver.BACKUP_LIBRARY = 1;
WebSqlDriver.BACKUP_DOCUMENTS = 0;
DI.set(STORE_DRIVER, WebSqlDriver);
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