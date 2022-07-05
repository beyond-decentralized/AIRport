import {
	ACTOR_PROPERTY_NAME,
	IAirportDatabase,
	IRepositoryLoader,
	REPOSITORY_PROPERTY_NAME,
	USER_PROPERTY_NAME
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbEntity,
	DbProperty,
	ensureChildArray,
	EntityRelationType,
	IActor,
	IEntityStateManager,
	PortableQuery, QueryResultType
} from '@airport/ground-control'
import { Actor, Actor_LocalId, Repository_LocalId } from '@airport/holding-pattern'
import { IActorDao, IRepositoryDao } from '@airport/holding-pattern/lib/dao/dao'
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
	actorDao: IActorDao

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	repositoryDao: IRepositoryDao

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
		switch (portableQuery.queryResultType) {
			case QueryResultType.ENTITY_GRAPH:
			case QueryResultType.ENTITY_TREE:
				break;
			default:
				return
		}

		const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
			.currentVersion[0].applicationVersion.entities[portableQuery.tableIndex]

		const entityMapByRepositoryLocalId = new Map<Repository_LocalId, any[]>()
		const entityMapByActorRecordId = new Map<Actor_LocalId, any[]>()
		const actorsToRetrieveUserForByLocalId = new Map<Actor_LocalId, IActor>()

		this.markEntities(entities, new Set(), entityMapByRepositoryLocalId,
			entityMapByActorRecordId, actorsToRetrieveUserForByLocalId, dbEntity)

		const actorIdSet = new Set<Actor_LocalId>()
		for (const actorLocalId of entityMapByActorRecordId.keys()) {
			actorIdSet.add(actorLocalId)
		}
		for (const actorLocalId of actorsToRetrieveUserForByLocalId.keys()) {
			actorIdSet.add(actorLocalId)
		}
		const actorLocalIds: number[] = Array.from(actorIdSet)
		const actors = await this.actorDao.findWithUsersAndTheirLocationBy_LocalIds(actorLocalIds)
		for (const actor of actors) {
			const entitiesWithoutActorObject = entityMapByActorRecordId.get(actor._localId)
			if (entitiesWithoutActorObject) {
				for (const entity of entitiesWithoutActorObject) {
					entity.actor = actor
				}
			}
			const actorWithoutUserObject = actorsToRetrieveUserForByLocalId.get(actor._localId)
			if (actorWithoutUserObject) {
				actorWithoutUserObject.user = actor.user
			}
		}

		const repositoryLocalIds = Array.from(entityMapByRepositoryLocalId.keys())
		const repositories = await this.repositoryDao
			.findWithLocationAndOwnerAndTheirLocationBy_LocalIds(repositoryLocalIds)

		for (const repository of repositories) {
			const entiesWithoutRepositoryObject = entityMapByRepositoryLocalId.get(repository._localId)
			for (const entity of entiesWithoutRepositoryObject) {
				entity.repository = repository
			}
		}
	}

	private markEntities<E, EntityArray extends Array<E>>(
		currentEntities: EntityArray,
		processedEntitySet: Set<Object>,
		entityMapByRepositoryLocalId: Map<Repository_LocalId, any[]>,
		entityMapByActorRecordId: Map<Actor_LocalId, any[]>,
		actorsToRetrieveUserForByLocalId: Map<Actor_LocalId, IActor>,
		dbEntity: DbEntity
	): void {
		for (const entity of currentEntities) {
			// const previouslyFoundEntity = entitiesByOperationIndex[operationUniqueId]
			if (processedEntitySet.has(entity)) {
				continue;
			}
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
							if (this.processRepositoryOrActor(dbProperty, propertyValue,
								entityMapByRepositoryLocalId, entityMapByActorRecordId,
								actorsToRetrieveUserForByLocalId)) {
								continue
							}
							relatedEntities = [propertyValue]
							break
						case EntityRelationType.ONE_TO_MANY:
							break
					}
					this.markEntities(
						relatedEntities,
						processedEntitySet,
						entityMapByRepositoryLocalId,
						entityMapByActorRecordId,
						actorsToRetrieveUserForByLocalId,
						dbRelation.relationEntity
					)
				}
			}
		}
	}

	private processRepositoryOrActor(
		dbProperty: DbProperty,
		propertyValue: any,
		entityMapByRepositoryLocalId: Map<Repository_LocalId, any[]>,
		entityMapByActorLocalId: Map<Actor_LocalId, any[]>,
		actorsToRetrieveUserForByLocalId: Map<Actor_LocalId, IActor>
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

		if (propertyValue.GUID) {
			if (!isActor) {
				return true
			}
			if (!propertyValue[USER_PROPERTY_NAME]) {
				actorsToRetrieveUserForByLocalId.set(propertyValue._localId, propertyValue)
			}
			return true
		}

		if (isActor) {
			ensureChildArray(entityMapByActorLocalId, propertyValue._localId)
				.push(propertyValue)
		} else {
			ensureChildArray(entityMapByRepositoryLocalId, propertyValue._localId)
				.push(propertyValue)
		}

		return true
	}

}
