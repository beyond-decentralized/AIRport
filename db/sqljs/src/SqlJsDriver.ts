// FIXME: add support, in future, if needed
// import {Database}      from 'sql.js'
import {SQLDialect}     from '@airport/fuel-hydrant-system'
import {
	QueryType,
	StoreType
}                       from '@airport/ground-control'
import {SqLiteDriver}   from '@airport/sqlite'
import {
	IOperationContext,
	ITransaction
} from '@airport/terminal-map';

declare function require(moduleName: string): any;

/**
 * Created by Papa on 11/27/2016.
 */

declare var SQL

export class SqlJsDriver
	extends SqLiteDriver {

	// FIXME: add support, in future, if needed
	// private _db: Database
	private _db: any

	private currentTransaction

	constructor() {
		super()
		this.type = StoreType.SQLJS
	}

	isServer(
		context: IOperationContext,
	): boolean {
		return false
	}

	async initialize(): Promise<any> {
		if (typeof SQL !== 'undefined') {
			this._db = new SQL.Database()
		} else {
			// FIXME: add support, in future, if needed
			// let sql  = require('sql.js')
			// this._db = new sql.Database()
			throw new Error('Not implemented')
		}
	}

	async transact(
		callback: {
			(
				transaction: ITransaction
			): Promise<void>
		},
		context: IOperationContext,
		): Promise<void> {
		this._db.exec('BEGIN TRANSACTION;')
		this.currentTransaction = true
		// TODO implement

		return null
	}

	async commit(): Promise<void> {
		try {
			this._db.exec('COMMIT;')
		} finally {
			this.currentTransaction = false
		}
	}

	async rollback(): Promise<void> {
		try {
			this._db.exec('ROLLBACK;')
		} finally {
			this.currentTransaction = false
		}
	}

	async query(
		queryType: QueryType,
		query: string,
		params                   = [],
		saveTransaction: boolean = false
	): Promise<any> {
		return new Promise<any>((
			resolve,
			reject
		) => {
			let stmt
			try {
				if (!['TQ_BOOLEAN_FIELD_CHANGE', 'TQ_DATE_FIELD_CHANGE', 'TQ_NUMBER_FIELD_CHANGE', 'TQ_STRING_FIELD_CHANGE',
					'TQ_ENTITY_CHANGE', 'TQ_ENTITY_WHERE_CHANGE', 'TQ_TRANSACTION'].some((deltaTableName) => {
					return query.indexOf(deltaTableName) > -1
				})) {
					console.log(query)
					console.log(params)
				}
				stmt = this._db.prepare(query)
				stmt.bind(params)

				let results = []
				while (stmt.step()) {
					results.push(stmt.get())
				}
				resolve(results)
			} catch (error) {
				reject(error)
			} finally {
				if (stmt) {
					stmt.free()
				}
			}
		})
	}

	handleError(error: any) {
		throw error
	}

	protected getDialect(): SQLDialect {
		return SQLDialect.SQLITE
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

