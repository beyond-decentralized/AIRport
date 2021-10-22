import { IInjectable } from '@airport/di'
import { ITransactionHistory } from '@airport/holding-pattern'
import {
	ICredentials,
	ITransaction
} from '@airport/terminal-map'
import pg from 'pg'

import { PostgreSqlDriver } from './PostgreSqlDriver'

export class PostgreTransaction
	extends PostgreSqlDriver
	implements ITransaction {

	credentials: ICredentials
	transHistory: ITransactionHistory

	constructor(
		private driver: PostgreSqlDriver,
		pool: pg.Pool,
		private client: pg.PoolClient
	) {
		super()
		this.pool = pool;
		(<IInjectable>this).__container__ = (<IInjectable>driver).__container__
	}

	async saveTransaction(transaction: ITransactionHistory): Promise<void> {
	}

	async commit(): Promise<void> {
		try {
			await this.client.query('COMMIT');
		} finally {
			this.client.release()
		}
	}

	async rollback(): Promise<void> {
		try {
			await this.client.query('ROLLBACK');
		} finally {
			this.client.release()
		}
	}

	protected async getClient(): Promise<pg.PoolClient | pg.Pool> {
		return await this.client
	}

}
