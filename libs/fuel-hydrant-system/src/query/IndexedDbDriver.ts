import {
	ATransactionHistory,
	IStoreDriver,
	PortableQuery
} from '@airport/ground-control'
import {Observable} from 'rxjs'

export class IndexedDbDriver
	implements IStoreDriver {

	async deleteWhere(
		portableQuery: PortableQuery
	): Promise<number> {

	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {



	}

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<E> {
	}

	async initialize(dbName: string): Promise<any> {
	}

	async insertValues(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<number> {
	}

	async saveTransaction(transaction: ATransactionHistory): Promise<any> {
	}

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Observable<EntityArray> {
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Observable<E> {
	}

	async updateWhere(portableQuery: PortableQuery): Promise<number> {
	}

	async startTransaction(): Promise<void> {
	}

	async commitTransaction(): Promise<void> {
	}

	async rollbackTransaction(): Promise<void> {
	}

}