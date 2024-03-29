import {
	IAirportDatabase,
	IRepositoryLoader
} from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IObservableQueryAdapter } from '@airport/flight-number'
import {
	Actor_LocalId,
	DbEntity,
	DbRelation,
	Dictionary,
	EntityRelationType,
	IActor,
	IDatastructureUtils,
	PortableQuery, QueryResultType, Repository_LocalId
} from '@airport/ground-control'
import { IActorDao, IRepositoryDao } from '@airport/holding-pattern/dist/app/bundle'
import {
	IQueryManager,
	IQueryOperationContext,
	IStoreDriver
} from '@airport/terminal-map'
import { Observable } from 'rxjs'

@Injected()
export class QueryManager
	implements IQueryManager {

	@Inject()
	actorDao: IActorDao

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	dictionary: Dictionary

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	observableQueryAdapter: IObservableQueryAdapter

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryLoader: IRepositoryLoader

	@Inject()
	storeDriver: IStoreDriver

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext
	): Promise<EntityArray> {
		await this.ensureRepositoryPresenceAndCurrentState(context)

		const entityArray = await this.storeDriver.find<E, EntityArray>(portableQuery, {}, context)

		if (!entityArray || !entityArray.length) {
			return entityArray
		}

		await this.populateEntityGuidEntitiesAndUserAccounts(
			portableQuery, entityArray, context);

		return entityArray;
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext
	): Promise<E> {
		await this.ensureRepositoryPresenceAndCurrentState(context)

		const entity = await this.storeDriver.findOne<E>(portableQuery, {}, context)

		if (!entity) {
			return entity
		}

		await this.populateEntityGuidEntitiesAndUserAccounts(
			portableQuery, [entity], context);

		return entity
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext
	): Observable<EntityArray> {
		return this.observableQueryAdapter.wrapInObservable(
			portableQuery,
			async (
				context: IQueryOperationContext
			) => {
				await this.ensureRepositoryPresenceAndCurrentState(context)

				const result: any[] = await this.storeDriver.find(portableQuery, {}, context)

				if (!result || !result.length) {
					return result
				}
				return await this.populateEntityGuidEntitiesAndUserAccounts<E>(
					portableQuery, result,
					{
						...context,
						// TODO: improve CachedSQLQuery to support multiple queries per context
						// and re-evaluation of query params in the finally run query works
						cachedSqlQuery: null
					})

			},
			context
		)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext
	): Observable<E> {
		return this.observableQueryAdapter.wrapInObservable<E>(
			portableQuery,
			async (
				context: IQueryOperationContext
			) => {
				await this.ensureRepositoryPresenceAndCurrentState(context)

				const result: any = await this.storeDriver.findOne(portableQuery, {}, context)

				if (!result) {
					return result
				}
				await this.populateEntityGuidEntitiesAndUserAccounts<E>(
					portableQuery, [result],
					{
						...context,
						// TODO: improve CachedSQLQuery to support multiple queries per context
						// and re-evaluation of query params in the finally run query works
						cachedSqlQuery: null
					})

				return result
			},
			context
		)
	}

	private async ensureRepositoryPresenceAndCurrentState(
		context: IQueryOperationContext
	) {
		if (context.repository && context.repository.GUID) {
			await this.repositoryLoader.loadRepository(context.repository.GUID, context)
		}
	}

	private async populateEntityGuidEntitiesAndUserAccounts<E>(
		portableQuery: PortableQuery,
		entities: Array<E>,
		context: IQueryOperationContext
	): Promise<Array<E>> {
		if (!entities.length) {
			return
		}
		if (portableQuery.queryResultType !== QueryResultType.ENTITY_GRAPH
			&& portableQuery.queryResultType !== QueryResultType.ENTITY_TREE) {
			return
		}

		const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
			.currentVersion[0].applicationVersion.entities[portableQuery.entityIndex]

		const entityMapByRepositoryLocalId = new Map<Repository_LocalId, any[]>()
		const entityMapByActorRecordId = new Map<Actor_LocalId, any[]>()
		const actorsToRetrieveUserAccountForByLocalId = new Map<Actor_LocalId, IActor>()

		this.markEntities(entities, new Set(), entityMapByRepositoryLocalId,
			entityMapByActorRecordId, actorsToRetrieveUserAccountForByLocalId, dbEntity)

		await this.populateActorsAndUserAccounts(
			entityMapByActorRecordId,
			actorsToRetrieveUserAccountForByLocalId,
			context
		)
		await this.populateRepositories(entityMapByRepositoryLocalId, context)

		return entities
	}

	private markEntities<E, EntityArray extends Array<E>>(
		currentEntities: EntityArray,
		processedEntitySet: Set<Object>,
		entityMapByRepositoryLocalId: Map<Repository_LocalId, any[]>,
		entityMapByActorRecordId: Map<Actor_LocalId, any[]>,
		actorsToRetrieveUserAccountForByLocalId: Map<Actor_LocalId, IActor>,
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
							if (this.processRepositoryOrActor(entity, dbRelation, propertyValue,
								entityMapByRepositoryLocalId, entityMapByActorRecordId,
								actorsToRetrieveUserAccountForByLocalId)) {
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
						actorsToRetrieveUserAccountForByLocalId,
						dbRelation.relationEntity
					)
				}
			}
		}
	}

	private processRepositoryOrActor(
		entity: any,
		dbRelation: DbRelation,
		propertyValue: any,
		entityMapByRepositoryLocalId: Map<Repository_LocalId, any[]>,
		entityMapByActorLocalId: Map<Actor_LocalId, any[]>,
		actorsToRetrieveUserAccountForByLocalId: Map<Actor_LocalId, IActor>
	): boolean {
		let isActor = this.dictionary.isActor(dbRelation.relationEntity)
		if (!isActor) {
			if (!this.dictionary.isRepository(dbRelation.relationEntity)) {
				return false
			}
		}

		if (!propertyValue[this.dictionary.column._localId]) {
			throw new Error(`Actor entity does not have a _localId`)
		}

		if (propertyValue.GUID) {
			if (!isActor) {
				return true
			}
			if (!propertyValue[this.dictionary.Actor.properties.userAccount]) {
				actorsToRetrieveUserAccountForByLocalId.set(propertyValue._localId, propertyValue)
			}
			return true
		}

		if (isActor) {
			this.datastructureUtils.ensureChildArray(entityMapByActorLocalId, propertyValue._localId)
				.push(entity)
		} else {
			this.datastructureUtils.ensureChildArray(entityMapByRepositoryLocalId, propertyValue._localId)
				.push(entity)
		}

		return true
	}

	private async populateActorsAndUserAccounts(
		entityMapByActorRecordId: Map<Actor_LocalId, any[]>,
		actorsToRetrieveUserAccountForByLocalId: Map<Actor_LocalId, IActor>,
		context: IContext
	): Promise<void> {
		const actorLidSet = new Set<Actor_LocalId>()
		for (const actorLocalId of entityMapByActorRecordId.keys()) {
			actorLidSet.add(actorLocalId)
		}
		for (const actorLocalId of actorsToRetrieveUserAccountForByLocalId.keys()) {
			actorLidSet.add(actorLocalId)
		}

		if (!actorLidSet.size) {
			return
		}

		const actorLocalIds: number[] = Array.from(actorLidSet)
		const actors = await this.actorDao.findWithUserAccountBy_LocalIdIn(
			actorLocalIds, context)
		for (const actor of actors) {
			const entitiesWithoutActorObject = entityMapByActorRecordId.get(actor._localId)
			if (entitiesWithoutActorObject) {
				for (const entity of entitiesWithoutActorObject) {
					entity.actor = actor
				}
			}
			const actorWithoutUserAccountObject = actorsToRetrieveUserAccountForByLocalId.get(actor._localId)
			if (actorWithoutUserAccountObject) {
				actorWithoutUserAccountObject.userAccount = actor.userAccount
			}
		}
	}

	private async populateRepositories(
		entityMapByRepositoryLocalId: Map<Repository_LocalId, any[]>,
		context: IContext
	): Promise<void> {
		const repositoryLocalIds = Array.from(entityMapByRepositoryLocalId.keys())

		if (!repositoryLocalIds.length) {
			return
		}

		const repositories = await this.repositoryDao
			.findWithOwnerBy_LocalIdIn(repositoryLocalIds, context)

		for (const repository of repositories) {
			const entiesWithoutRepositoryObject = entityMapByRepositoryLocalId.get(repository._localId)
			for (const entity of entiesWithoutRepositoryObject) {
				entity.repository = repository
			}
		}
	}

}
