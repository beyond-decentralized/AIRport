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
	STORE_DRIVER,
	TERMINAL_STORE
} from '@airport/terminal-map';
import { container, DI } from '@airport/di';
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
		parentTransaction?: ITransaction,
	): Promise<void> {
		const transaction = await this.setupTransaction(context, parentTransaction)

		try {
			this.startTransaction(transaction)
		} catch (e) {
			this.tearDownTransaction(transaction, context)
			console.error(e)
			throw e
		}

		try {
			await transactionalCallback(transaction)
			await this.commit(transaction)
		} catch (e) {
			await this.rollback(transaction)
		} finally {
			this.tearDownTransaction(transaction, context)
		}
	}

	async setupTransaction(
		context: IOperationContext,
		parentTransaction?: ITransaction,
	): Promise<ITransaction> {
		const transaction = new SqlJsTransaction(this, parentTransaction)

		const terminalStore = await container(this).get(TERMINAL_STORE)
		terminalStore.getTransactionMapById().set(transaction.id, transaction)

		return transaction
	}

	async tearDownTransaction(
		transaction: ITransaction,
		context: IOperationContext,
	): Promise<void> {
		if (transaction.parentTransaction) {
			transaction.parentTransaction.childTransaction = null
			transaction.parentTransaction = null
		}

		const terminalStore = await container(this).get(TERMINAL_STORE)
		terminalStore.getTransactionMapById().delete(transaction.id)
	}

	async startTransaction(
		transaction: ITransaction,
	): Promise<void> {
		this._db.exec(`SAVEPOINT ${transaction.id}`)
	}

	async commit(
		transaction: ITransaction,
	): Promise<void> {
		this._db.exec(`RELEASE SAVEPOINT ${transaction.id}`)
	}

	async rollback(
		transaction: ITransaction,
	): Promise<void> {
		this._db.exec(`ROLLBACK TO SAVEPOINT ${transaction.id}`)
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
