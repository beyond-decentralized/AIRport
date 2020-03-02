"use strict";
/**
 * Created by Papa on 9/1/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const DB_NAME = '__ionicstorage';
const win = window;
/**
 * @usage
 ```js
 * let storage = new Storage(SqlStorage, options);
 * storage.set('name', 'Max');
 * storage.get('name').then((name) => {
 * });
 *
 * // Sql storage also exposes the full engine underneath
 * storage.query('insert into projects(name, data) values("Cool Project", "blah")');
 * storage.query('select * from projects').then((resp) => {})
 * ```
 *
 * The `SqlStorage` service supports these options:
 * {
 *   name: the name of the terminal (__ionicstorage by default)
 *   backupFlag: // where to store the file, default is BACKUP_LOCAL which DOES NOT store to iCloud. Other options: BACKUP_LIBRARY, BACKUP_DOCUMENTS
 *   existingDatabase: whether to load this as an existing terminal (default is false)
 * }
 *
 */
class SqlStorage {
    constructor() {
        let dbOptions = {
            name: DB_NAME,
            backupFlag: SqlStorage.BACKUP_LOCAL,
            existingDatabase: false
        };
        if (win.sqlitePlugin) {
            let location = this.getBackupLocation(dbOptions.backupFlag);
            dbOptions.location = location;
            dbOptions.createFromLocation = dbOptions.existingDatabase ? 1 : 0;
            this._db = win.sqlitePlugin.openDatabase(dbOptions);
        }
        else {
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');
            this._db = win.openDatabase(dbOptions.name, '1.0', 'terminal', 5 * 1024 * 1024);
        }
        this._tryInit();
    }
    getBackupLocation(dbFlag) {
        switch (dbFlag) {
            case SqlStorage.BACKUP_LOCAL:
                return 2;
            case SqlStorage.BACKUP_LIBRARY:
                return 1;
            case SqlStorage.BACKUP_DOCUMENTS:
                return 0;
            default:
                throw Error('Invalid backup flag: ' + dbFlag);
        }
    }
    _tryInit() {
        this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(err => {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
        });
    }
    query(query, params = []) {
        return new Promise((resolve, reject) => {
            try {
                this._db.repositoryTransactionHistory((tx) => {
                    tx.executeSql(query, params, (tx, res) => resolve({ tx: tx, res: res }), (tx, err) => reject({ tx: tx, err: err }));
                }, (err) => reject({ err: err }));
            }
            catch (err) {
                reject({ err: err });
            }
        });
    }
}
exports.SqlStorage = SqlStorage;
SqlStorage.BACKUP_LOCAL = 2;
SqlStorage.BACKUP_LIBRARY = 1;
SqlStorage.BACKUP_DOCUMENTS = 0;
//# sourceMappingURL=SqlStorage.js.map