import {
	INVALID_TABLE_NAME,
	QueryType,
	StoreType
} from '@airport/ground-control'
import { SQLDialect } from '@airport/fuel-hydrant-system'
import { SqLiteDriver } from '@airport/sqlite'
import {
	IOperationContext,
	ITransaction
} from '@airport/tower'

/**
 * Created by Papa on 8/30/2016.
 */
export interface PendingStatement {
	id: number
	queryType: QueryType
	query: string
	params: any[]
	reject: (error: any) => void;
	resolve: (result: any) => void;
}

export class WebSqlDriver
	extends SqLiteDriver {

	static BACKUP_LOCAL = 2
	static BACKUP_LIBRARY = 1
	static BACKUP_DOCUMENTS = 0

	private _db: any

	private currentStatementId = 0
	private keepAlive = false
	private keepAliveCount = 0
	private transaction
	private pendingStatements: PendingStatement[] = []

	constructor() {
		super()
		this.type = StoreType.SQLITE_CORDOVA
	}

	protected getDialect(): SQLDialect {
		return SQLDialect.SQLITE
	}

	private getBackupLocation(dbFlag: number): number {
		switch (dbFlag) {
			case WebSqlDriver.BACKUP_LOCAL:
				return 2
			case WebSqlDriver.BACKUP_LIBRARY:
				return 1
			case WebSqlDriver.BACKUP_DOCUMENTS:
				return 0
			default:
				throw Error('Invalid backup flag: ' + dbFlag)
		}
	}

	async initialize(
		dbName: string,
		context: IOperationContext<any, any>,
	): Promise<any> {
		let dbOptions: any = {
			name: dbName,
			backupFlag: WebSqlDriver.BACKUP_LOCAL,
			existingDatabase: false
		}

		let win: any = window
		if (win.sqlitePlugin) {
			let location = this.getBackupLocation(dbOptions.backupFlag)
			dbOptions.location = location
			dbOptions.createFromLocation = dbOptions.existingDatabase ? 1 : 0
			this._db = win.sqlitePlugin.openDatabase(dbOptions)
		} else {
			// console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make
			// sure to install cordova-sqlite-storage in production!')
			this._db = win.openDatabase(dbOptions.name, '1.0', 'terminal', 5 * 1024 * 1024)
		}
	}

	async transact(
		callback: {
			(
				transaction: ITransaction
			): Promise<void>
		},
		context: IOperationContext<any, any>,
	): Promise<void> {
		throw new Error('not implemented')
	}

	async rollback(): Promise<void> {
		if (this.transaction) {
			this.transaction.executeSql('SELECT count(*) FROM ' + INVALID_TABLE_NAME, [])
		}
		await this.commit()
	}

	async commit(): Promise<void> {
		this.keepAlive = false
		this.keepAliveCount = 0
		this.transaction = null
	}

	async query(
		queryType: QueryType,
		query: string,
		params = [],
		context: IOperationContext<any, any>,
		saveTransaction: boolean = false
	): Promise<any> {
		return new Promise((
			resolve,
			reject
		) => {
			let id = ++this.currentStatementId
			this.pendingStatements.push({
				id,
				query,
				queryType,
				params,
				reject,
				resolve
			})
			try {
				if (!this.transaction) {
					this._db.transaction((tx) => {
						this.transaction = tx
						this.executePendingStatements(tx)
					},
						(err) => {
							reject(err)
						},
						(done) => {
							console.log('Transaction finished')
							// nothing to do
						})
				}
			} catch (err) {
				reject(err)
			}
		})
	}

	private keepTransactionAlive(tx): void {
		tx.executeSql('SELECT count(*) FROM npmjs_org___airport__territory__Package', [], (
			tx,
		) => {
			this.executePendingStatements(tx)
		}, (
			tx,
		) => {
			this.executePendingStatements(tx)
		})
	}

	private executePendingStatements(tx): void {
		if (this.pendingStatements.length) {
			let statement = this.pendingStatements.shift()

			console.log(statement.query)
			console.log(statement.params)
			if (this.keepAlive) {
				this.keepAliveCount = 100
			}
			tx.executeSql(statement.query, statement.params,
				(
					tx,
					res
				) => {
					let response = this.getReturnValue(statement.queryType, res)
					console.log(response)
					statement.resolve(response)
					this.executePendingStatements(tx)
				},
				(
					tx,
					err
				) => {
					statement.reject(err)
					this.executePendingStatements(tx)
				})
		} else if (--this.keepAliveCount > 0) {
			this.keepTransactionAlive(tx)
		} else {
			this.commit().then()
		}
	}

	private getReturnValue(
		queryType: QueryType,
		response
	): any {
		switch (queryType) {
			case QueryType.MUTATE:
				return response.rowsAffected
			case QueryType.SELECT:
				return response.rows
			default:
				return null
		}
	}

}

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
