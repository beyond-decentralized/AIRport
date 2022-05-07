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
	ITransactionContext
} from '@airport/terminal-map';
import { SqlJsTransaction } from './SqlJsTransaction';
import {
	Injected
} from '@airport/direction-indicator'

declare function initSqlJs(config: any): any;

/**
 * Created by Papa on 11/27/2016.
 */
@Injected()
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

	async setupTransaction(
		context: ITransactionContext,
		parentTransaction?: ITransaction,
	): Promise<ITransaction> {
		const transaction = new SqlJsTransaction(this, parentTransaction)

		await this.internalSetupTransaction(transaction, context)

		return transaction
	}

	async internalStartTransaction(
		transaction: ITransaction,
		context?: ITransactionContext,
	): Promise<void> {
		while (!this._db) {
			await this.wait(50)
		}
		const command = `SAVEPOINT '${transaction.id}'`
		console.log(command)
		this._db.exec(command)
	}

	async internalCommit(
		transaction: ITransaction,
		context?: ITransactionContext,
	): Promise<void> {
		while (!this._db) {
			await this.wait(50)
		}
		const command = `RELEASE SAVEPOINT '${transaction.id}'`
		console.log(command)
		this._db.exec(command)
	}

	async internalRollback(
		transaction: ITransaction,
		context?: ITransactionContext,
	): Promise<void> {
		while (!this._db) {
			await this.wait(50)
		}
		const command = `ROLLBACK TO SAVEPOINT '${transaction.id}'`
		console.log(command)
		this._db.exec(command)
	}

	async query(
		queryType: QueryType,
		query: string,
		params = [],
		context: IOperationContext,
		saveTransaction: boolean = false
	): Promise<any> {
		while (!this._db) {
			await this.wait(50)
		}
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

	private wait(
		milliseconds
	): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve()
			}, milliseconds)
		})
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
