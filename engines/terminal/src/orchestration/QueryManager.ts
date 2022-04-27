import { IRepositoryLoader } from '@airport/air-control'
import {
	DEPENDENCY_INJECTION
} from '@airport/direction-indicator'
import {
	PortableQuery
} from '@airport/ground-control'
import {
	IQueryManager,
	IQueryOperationContext,
	IStoreDriver
} from '@airport/terminal-map'
import { Observable } from 'rxjs'
import { QUERY_MANAGER } from '../tokens'

export class QueryManager
	implements IQueryManager {

	repositoryLoader: IRepositoryLoader
	storeDriver: IStoreDriver

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		await this.ensureRepositoryPresenceAndCurrentState(context)

		return await this.storeDriver.find<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<E> {
		await this.ensureRepositoryPresenceAndCurrentState(context)

		return await this.storeDriver.findOne<E>(portableQuery, {}, context, cachedSqlQueryId)
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		// TODO: checking for presence of a repository in in an observable
		// await this.ensureRepositoryPresenceAndCurrentState(context)

		return this.storeDriver.search<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Observable<E> {
		// TODO: checking for presence of a repository in in an observable
		// await this.ensureRepositoryPresenceAndCurrentState(context)

		return this.storeDriver.searchOne<E>(portableQuery, {}, context, cachedSqlQueryId)
	}

	private async ensureRepositoryPresenceAndCurrentState(
		context: IQueryOperationContext
	) {
		if (context.repository && context.repository.source && context.repository.uuId) {
			await this.repositoryLoader.loadRepository(context.repository.source, context.repository.uuId, context)
		}
	}

}
DEPENDENCY_INJECTION.set(QUERY_MANAGER, QueryManager)
