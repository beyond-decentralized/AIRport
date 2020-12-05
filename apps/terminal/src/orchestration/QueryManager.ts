import {
	container,
	DI,
	IContext
}                      from '@airport/di'
import {
	PortableQuery,
	STORE_DRIVER
}                      from '@airport/ground-control'
import {IObservable}   from '@airport/observe'
import {QUERY_MANAGER} from '../tokens'

export interface IQueryManager {

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<E>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<IObservable<EntityArray>>;

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
	): Promise<IObservable<E>>;

}

export class QueryManager
	implements IQueryManager {

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		const storeDriver = await container(this)
			.get(STORE_DRIVER)

		return await storeDriver.find<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<E> {
		const storeDriver = await container(this)
			.get(STORE_DRIVER)

		return await storeDriver.findOne<E>(portableQuery, {}, context, cachedSqlQueryId)
	}

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<IObservable<EntityArray>> {
		const storeDriver = await container(this)
			.get(STORE_DRIVER)

		return await storeDriver.search<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<IObservable<E>> {
		const storeDriver = await container(this)
			.get(STORE_DRIVER)

		return await storeDriver.searchOne<E>(portableQuery, {}, context, cachedSqlQueryId)
	}

}

DI.set(QUERY_MANAGER, QueryManager)
