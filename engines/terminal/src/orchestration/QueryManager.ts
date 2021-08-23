import {
	container,
	DI,
	IContext
}                      from '@airport/di'
import {
	PortableQuery,
	STORE_DRIVER
}                      from '@airport/ground-control'
import {
	IQueryManager
}                      from '@airport/terminal-map'
import {Observable}   from 'rxjs'
import {QUERY_MANAGER} from '../tokens'

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

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		const storeDriver = container(this)
			.getSync(STORE_DRIVER)

		return storeDriver.search<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number,
	): Observable<E> {
		const storeDriver = container(this)
			.getSync(STORE_DRIVER)

		return storeDriver.searchOne<E>(portableQuery, {}, context, cachedSqlQueryId)
	}

}

DI.set(QUERY_MANAGER, QueryManager)
