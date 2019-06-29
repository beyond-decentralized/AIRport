import {DI}            from '@airport/di'
import {
	PortableQuery,
	STORE_DRIVER
}                      from '@airport/ground-control'
import {IObservable}   from '@airport/observe'
import {QUERY_MANAGER} from '../diTokens'

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
	): Promise<IObservable<EntityArray>>;

	searchOne<E>(
		portableQuery: PortableQuery
	): Promise<IObservable<E>>;

}

export class QueryManager
	implements IQueryManager {

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		return DI.get(STORE_DRIVER).then(
			storeDriver =>
				storeDriver.find<E, EntityArray>(portableQuery, cachedSqlQueryId)
		)
	}

	findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<E> {
		return DI.get(STORE_DRIVER).then(
			storeDriver =>
				storeDriver.findOne<E>(portableQuery, cachedSqlQueryId)
		)
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<IObservable<EntityArray>> {
		return DI.get(STORE_DRIVER).then(
			storeDriver =>
				storeDriver.search<E, EntityArray>(portableQuery, cachedSqlQueryId)
		)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<IObservable<E>> {
		return DI.get(STORE_DRIVER).then(
			storeDriver =>
				storeDriver.searchOne<E>(portableQuery, cachedSqlQueryId)
		)
	}

}

DI.set(QUERY_MANAGER, QueryManager)
