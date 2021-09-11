import { IInjectable } from '@airport/di'
import { INVALID_TABLE_NAME } from '@airport/ground-control'
import { ITransactionHistory } from '@airport/holding-pattern'
import {
	ICredentials,
	ITransaction
} from '@airport/terminal-map'
import { WebSqlDriver } from './WebSqlDriver'

export class WebSqlTransaction
	extends WebSqlDriver
	implements ITransaction {

	credentials: ICredentials
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

	async commit(): Promise<void> {
		// this.nativeTransaction.executeSql('COMMIT');
		// this.driver.commit();
	}

	async rollback(): Promise<void> {
		this.nativeTransaction.executeSql('SELECT count(*) FROM ' + INVALID_TABLE_NAME, [])
		// this.driver.rollback();
	}

}
