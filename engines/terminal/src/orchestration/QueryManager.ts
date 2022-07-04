import { ACTOR_PROPERTY_NAME, IRepositoryLoader, REPOSITORY_PROPERTY_NAME } from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbEntity,
	DbProperty,
	EntityRelationType,
	IEntityStateManager,
	PortableQuery, QueryResultType
} from '@airport/ground-control'
import { Actor_LocalId, Repository_LocalId } from '@airport/holding-pattern'
import {
	IQueryManager,
	IQueryOperationContext,
	IStoreDriver
} from '@airport/terminal-map'
import { Observable } from 'rxjs'

interface IOperationUniqueIdContainer {
	operationUniqueId: number
}

@Injected()
export class QueryManager
	implements IQueryManager {

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	repositoryLoader: IRepositoryLoader

	@Inject()
	storeDriver: IStoreDriver

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		await this.ensureRepositoryPresenceAndCurrentState(context)

		const entityArray = await this.storeDriver.find<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)

		await this.populateEntityGuidEntitiesAndUsers(
			portableQuery, entityArray);

		return entityArray;
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<E> {
		await this.ensureRepositoryPresenceAndCurrentState(context)

		const entity = await this.storeDriver.findOne<E>(portableQuery, {}, context, cachedSqlQueryId)

		await this.populateEntityGuidEntitiesAndUsers(
			portableQuery, [entity]);

		return entity
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
		if (context.repository && context.repository.source && context.repository.GUID) {
			await this.repositoryLoader.loadRepository(context.repository.source, context.repository.GUID, context)
		}
	}

	// TODO: if needed use the Entity structure of the incoming portable query
	// to definitively process the results
	private async populateEntityGuidEntitiesAndUsers<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		entities: EntityArray
	): Promise<void> {
		let isGraph = false
		switch (portableQuery.queryResultType) {
			case QueryResultType.ENTITY_GRAPH:
				isGraph = true
				break
			case QueryResultType.ENTITY_TREE:
				break;
			default:
				return
		}
	}

	private markEntityGraph<E, EntityArray extends Array<E>>(
		currentEntities: EntityArray,
		// entitiesByOperationIndex: any[],
		processedEntitySet: Set<Object>,
		entityMapByRepositoryId: Map<Repository_LocalId, any[]>,
		entityMapByActorId: Map<Actor_LocalId, any[]>,
		operationUniqueIdContainer: IOperationUniqueIdContainer,
		dbEntity: DbEntity
	) {
		for (const entity of currentEntities) {
			// const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId]
			if (processedEntitySet.has(entity)) {
				continue;
			}
			entity[this.entityStateManager.getUniqueIdFieldName()]
				= ++operationUniqueIdContainer.operationUniqueId
			processedEntitySet.add(entity)

			for (const dbProperty of dbEntity.properties) {
				let propertyValue: any = entity[dbProperty.name]
				if (!propertyValue) {
					continue
				}
				if (dbProperty.relation && dbProperty.relation.length) {
					const dbRelation = dbProperty.relation[0]
					let relatedEntities = propertyValue
					switch (dbRelation.relationType) {
						case EntityRelationType.MANY_TO_ONE:
							relatedEntities = [propertyValue]
							break
						case EntityRelationType.ONE_TO_MANY:
							break
					}
					this.markEntityGraph(
						relatedEntities,
						// entitiesByOperationIndex: any[],
						processedEntitySet,
						entityMapByRepositoryId,
						entityMapByActorId,
						operationUniqueIdContainer,
						dbRelation.relationEntity
					)
				}
			}
		}
	}

	processRepositoryOrActor(
		dbProperty: DbProperty,
		propertyValue: any
	): boolean {
		let isActor = true
		switch (dbProperty.name) {
			case ACTOR_PROPERTY_NAME:
				break
			case REPOSITORY_PROPERTY_NAME:
				isActor = false
				break
			default:
				return false
		}
		if (!propertyValue._localId) {
			throw new Error(`Actor entity does not have a _localId`)
		}
	}

}
