import { IInjectable } from '@airport/di'
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
	) {
		super();
		(<IInjectable>this).__container__ = (<IInjectable>driver).__container__
		this._db = driver._db
	}

	async saveTransaction(transaction: ITransactionHistory): Promise<any> {
	}

	async commit(): Promise<void> {
		this.driver.commit();
	}

	async rollback(): Promise<void> {
		this.driver.rollback();
	}

}
