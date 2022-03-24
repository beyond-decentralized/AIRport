import type * as SQL from 'sql.js'
import { SQLDialect } from '@airport/fuel-hydrant-system'
import {
	QueryType,
	StoreType
} from '@airport/ground-control'
import { SqLiteDriver } from '@airport/sqlite'
import {
	IOperationContext,
	ITransaction,
	STORE_DRIVER
} from '@airport/terminal-map';
import { DI } from '@airport/di';
import { SqlJsTransaction } from './SqlJsTransaction';

declare function initSqlJs(config: any): any;

/**
 * Created by Papa on 11/27/2016.
 */

export class SqlJsDriver
	extends SqLiteDriver {

	_db: SQL.Database

	constructor() {
		super()
		this.type = StoreType.SQLJS
	}

	async initialize(): Promise<any> {
		const SQL = await initSqlJs({
			// Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
			// You can omit locateFile completely when running in node
			locateFile: file => `./${file}`
		});
		this._db = new SQL.Database()
	}

	async transact(
		transactionalCallback: {
			(
				transaction: ITransaction
			): Promise<void>
		},
		context: IOperationContext,
	): Promise<void> {
		this.startTransaction()

		await transactionalCallback(new SqlJsTransaction(this))
	}

	async startTransaction(): Promise<ITransaction> {
		this._db.exec('BEGIN TRANSACTION;')

		return new SqlJsTransaction(this)
	}

	async commit(): Promise<void> {
		this._db.exec('COMMIT;')
	}

	async rollback(): Promise<void> {
		this._db.exec('ROLLBACK;')
	}

	async query(
		queryType: QueryType,
		query: string,
		params = [],
		context: IOperationContext,
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
				console.log(results)
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

	protected getRows(
		result: any
	): number {
		return result
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

	protected getDialect(): SQLDialect {
		return SQLDialect.SQLITE
	}

}
DI.set(STORE_DRIVER, SqlJsDriver);
