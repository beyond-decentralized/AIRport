import {
	ATransactionHistory,
	InternalFragments,
	ITransaction,
	PortableQuery,
	QueryType,
	SQLDataType
}                    from '@airport/ground-control'
import {
	Connection,
	Pool
}                    from 'mysql2/promise'
import {MySqlDriver} from './MySqlDriver'

export class MySqlTransaction
	implements ITransaction {

	constructor(
		private driver: MySqlDriver,
		private pool: Pool,
		private connection: Connection
	) {
	}

	deleteWhere(portableQuery: PortableQuery): Promise<number> {
		throw new Error('Method not implemented.')
	}

	find<E, EntityArray extends E[]>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		throw new Error('Method not implemented.')
	}

	findOne<E>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number
	): Promise<E> {
		throw new Error('Method not implemented.')
	}

	findNative(
		sqlQuery: string,
		parameters: any[]
	): Promise<any[]> {
		throw new Error('Method not implemented.')
	}

	insertValues(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<number> {
		throw new Error('Method not implemented.')
	}

	query(
		queryType: QueryType,
		query: string,
		params: any,
		saveTransaction?: boolean
	): Promise<any> {
		throw new Error('Method not implemented.')
	}

	saveTransaction(transaction: ATransactionHistory): Promise<any> {
		throw new Error('Method not implemented.')
	}

	updateWhere(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments
	): Promise<number> {
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

	isValueValid(
		value: any,
		sqlDataType: SQLDataType
	): boolean {
		throw new Error('Method not implemented.')
	}

}
