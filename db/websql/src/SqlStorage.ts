/**
 * Created by Papa on 9/1/2016.
 */

const DB_NAME: string = '__ionicstorage';
const win: any = window;

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
export class SqlStorage {
	static BACKUP_LOCAL = 2;
	static BACKUP_LIBRARY = 1;
	static BACKUP_DOCUMENTS = 0;

	private _db: any;

	constructor() {

		let dbOptions:any = {
			name: DB_NAME,
			backupFlag: SqlStorage.BACKUP_LOCAL,
			existingDatabase: false
		};

		if (win.sqlitePlugin) {
			let location = this.getBackupLocation(dbOptions.backupFlag);

			dbOptions.location = location;
			dbOptions.createFromLocation = dbOptions.existingDatabase ? 1 : 0

			this._db = win.sqlitePlugin.openDatabase(dbOptions);

		} else {
			console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');

			this._db = win.openDatabase(dbOptions.name, '1.0', 'terminal', 5 * 1024 * 1024);
		}
		this._tryInit();
	}

	private getBackupLocation(dbFlag: number): number {
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

	query(query: string, params = []): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this._db.repositoryTransactionHistory(( tx) => {
						tx.executeSql(query, params,
							(tx, res) => resolve({ tx: tx, res: res }),
							(tx, err) => reject({ tx: tx, err: err }));
					},
					(err) => reject({ err: err }));
			} catch (err) {
				reject({ err: err });
			}
		});
	}

}
