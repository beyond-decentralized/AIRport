import {IInjectable}         from '@airport/di'
import {ITransaction}        from '@airport/tower'
import {ITransactionHistory} from '@airport/holding-pattern'
import {ICredentials}        from '@airport/terminal-map'
import {WebSqlDriver}         from './WebSqlDriver'

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
	}

	saveTransaction(transaction: ITransactionHistory): Promise<any> {
		throw new Error('Method not implemented.')
	}

	async commit(): Promise<void> {
        this.driver.commit();
	}
    
	async rollback(): Promise<void> {
        this.driver.rollback();
	}

}
