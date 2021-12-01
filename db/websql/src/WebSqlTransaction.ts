import { IInjectable } from '@airport/di'
import { INVALID_TABLE_NAME, QueryType } from '@airport/ground-control'
import { ITransactionHistory } from '@airport/holding-pattern'
import {
	ICredentials,
	IOperationContext,
	ITransaction
} from '@airport/terminal-map'
import { WebSqlDriver } from './WebSqlDriver'

export class WebSqlTransaction
	extends WebSqlDriver
	implements ITransaction {

	credentials: ICredentials
	isSync = false
	transHistory: ITransactionHistory

	constructor(
		private driver: WebSqlDriver,
		private nativeTransaction
	) {
		super();
		(<IInjectable>this).__container__ = (<IInjectable>driver).__container__
		this._db = driver._db
	}

	async saveTransaction(transaction: ITransactionHistory): Promise<any> {
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
			try {
				this.doQuery(queryType, query, params,
					context, this.nativeTransaction, resolve, reject)
			} catch (error) {
				reject(error)
			}
		})
	}

	async commit(): Promise<void> {
		// this.nativeTransaction.executeSql('COMMIT');
		// this.driver.commit();
	}

	async rollback(): Promise<void> {
		this.nativeTransaction.executeSql('SELECT count(*) FROM ' + INVALID_TABLE_NAME, [])
		// this.driver.rollback();
	}

}
