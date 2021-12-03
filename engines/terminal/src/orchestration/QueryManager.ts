import { REPOSITORY_LOADER } from '@airport/air-control'
import {
	container,
	DI,
	IContext
} from '@airport/di'
import {
	PortableQuery,
	STORE_DRIVER
} from '@airport/ground-control'
import {
	IQueryManager, IQueryOperationContext
} from '@airport/terminal-map'
import { Observable } from 'rxjs'
import { QUERY_MANAGER } from '../tokens'

export class QueryManager
	implements IQueryManager {

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		await this.ensureRepositoryPresenceAndCurrentState(context)
		const storeDriver = await container(this)
			.get(STORE_DRIVER)

		return await storeDriver.find<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<E> {
		await this.ensureRepositoryPresenceAndCurrentState(context)
		const storeDriver = await container(this)
			.get(STORE_DRIVER)

		return await storeDriver.findOne<E>(portableQuery, {}, context, cachedSqlQueryId)
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		// TODO: checking for presence of a repository in in an observable
		// await this.ensureRepositoryPresenceAndCurrentState(context)
		const storeDriver = container(this)
			.getSync(STORE_DRIVER)

		return storeDriver.search<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Observable<E> {
		// TODO: checking for presence of a repository in in an observable
		// await this.ensureRepositoryPresenceAndCurrentState(context)

		const storeDriver = container(this)
			.getSync(STORE_DRIVER)

		return storeDriver.searchOne<E>(portableQuery, {}, context, cachedSqlQueryId)
	}

	private async ensureRepositoryPresenceAndCurrentState(
		context: IQueryOperationContext
	) {
		if (context.repository && context.repository.source && context.repository.uuId) {
			const repositoryLoader = await DI.db().get(REPOSITORY_LOADER)
			await repositoryLoader.loadRepository(context.repository.source, context.repository.uuId)
		}
	}

}

DI.set(QUERY_MANAGER, QueryManager)
