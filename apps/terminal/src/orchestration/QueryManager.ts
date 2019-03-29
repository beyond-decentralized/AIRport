import {DI}          from '@airport/di'
import {
	IStoreDriver,
	PortableQuery
}                    from '@airport/ground-control'
import {IObservable} from '@airport/observe'
import {
	QUERY_MANAGER,
	STORE_DRIVER
}                    from '../diTokens'

export interface IQueryManager {


	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<E>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery
	): IObservable<EntityArray>;

	searchOne<E>(
		portableQuery: PortableQuery
	): IObservable<E>;

}

export class QueryManager
	implements IQueryManager {

	private dataStore: IStoreDriver

	constructor() {
		DI.get((
			dataStore
		) => {
			this.dataStore = dataStore
		}, STORE_DRIVER)
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		return await this.dataStore.find<E, EntityArray>(portableQuery, cachedSqlQueryId)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<E> {
		return await this.dataStore.findOne<E>(portableQuery, cachedSqlQueryId)
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<EntityArray> {
		return this.dataStore.search<E, EntityArray>(portableQuery, cachedSqlQueryId)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<E> {
		return this.dataStore.searchOne<E>(portableQuery, cachedSqlQueryId)
	}

}

DI.set(QUERY_MANAGER, QueryManager)
