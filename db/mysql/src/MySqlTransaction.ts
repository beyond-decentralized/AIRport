import {
	ATransactionHistory,
	ITransaction
}                            from '@airport/ground-control'
import {ITransactionHistory} from '@airport/holding-pattern'
import {ICredentials}        from '@airport/terminal-map'
import {
	Connection,
	Pool
}                            from 'mysql2/promise'
import {MySqlDriver}         from './MySqlDriver'

export class MySqlTransaction
	extends MySqlDriver
	implements ITransaction {

	credentials: ICredentials
	transHistory: ITransactionHistory

	constructor(
		private driver: MySqlDriver,
		pool: Pool,
		private connection: Connection
	) {
		super()
		this.pool     = pool
		this.queryApi = connection
	}

	saveTransaction(transaction: ITransactionHistory): Promise<any> {
		throw new Error('Method not implemented.')
	}

	async commit(): Promise<void> {
		await this.connection.commit();
		(<any>this.pool).releaseConnection(this.connection)
	}

	async rollback(): Promise<void> {
		await this.connection.rollback();
		(<any>this.pool).releaseConnection(this.connection)
	}

}
