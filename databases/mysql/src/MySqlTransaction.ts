import { IInjected } from '@airport/direction-indicator'
import { ITransactionHistory } from '@airport/holding-pattern/dist/app/bundle'
import {
	ICredentials,
	ITransaction
} from '@airport/terminal-map'
import {
	Connection,
	Pool
} from 'mysql2/promise'
import { MySqlDriver } from './MySqlDriver'

export class MySqlTransaction
	extends MySqlDriver
	implements ITransaction {

	credentials: ICredentials
	isSync = false
	transactionHistory: ITransactionHistory

	constructor(
		private driver: MySqlDriver,
		pool: Pool,
		private connection: Connection
	) {
		super()
		this.pool = pool
		this.queryApi = connection;
		(<IInjected>this).__container__ = (<IInjected>driver).__container__
	}

	async saveTransaction(transaction: ITransactionHistory): Promise<void> {
	}

	async commit(): Promise<void> {
		await this.connection.commit();
		(<any>this.pool).pool.releaseConnection(this.connection.connection)
	}

	async rollback(): Promise<void> {
		await this.connection.rollback();
		(<any>this.pool).pool.releaseConnection(this.connection.connection)
	}

}
