import {
	ACTOR_PROPERTY_NAME,
	IAirportDatabase,
	IRepositoryLoader,
	REPOSITORY_PROPERTY_NAME,
	USER_ACCOUNT_PROPERTY_NAME
} from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { IObservableQueryAdapter } from '@airport/flight-number'
import {
	DbEntity,
	DbProperty,
	ensureChildArray,
	EntityRelationType,
	IActor,
	InternalFragments,
	PortableQuery, QueryResultType
} from '@airport/ground-control'
import { Actor_LocalId, Repository_LocalId } from '@airport/holding-pattern/dist/app/bundle'
import { IActorDao, IRepositoryDao } from '@airport/holding-pattern/dist/app/bundle'
import {
	IQueryManager,
	IQueryOperationContext,
	IStoreDriver
} from '@airport/terminal-map'
import { Observable } from 'rxjs'

interface StoreDriverObservableMethod<E> {
	(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<E>
}

interface IFormatter {
	(data: string, toUpper: boolean): string;
};

@Injected()
export class QueryManager
	implements IQueryManager {

	@Inject()
	actorDao: IActorDao

	@Inject()
	airportDatabase: IAirportDatabase

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
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		await this.ensureRepositoryPresenceAndCurrentState(context)

		const entityArray = await this.storeDriver.find<E, EntityArray>(portableQuery, {}, context, cachedSqlQueryId)

		await this.populateEntityGuidEntitiesAndUserAccounts(
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

		await this.populateEntityGuidEntitiesAndUserAccounts(
			portableQuery, [entity]);

		return entity
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		return this.observableQueryAdapter.wrapInObservable(
			portableQuery,
			() => {
				return this.storeDriver.find(portableQuery, {}, context)
					.then((result: EntityArray) => {
						return this.populateEntityGuidEntitiesAndUserAccounts<E>(
							portableQuery, result);
					})
			}
		)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number,
	): Observable<E> {
		return this.observableQueryAdapter.wrapInObservable<E>(
			portableQuery,
			() => {
				return this.storeDriver.findOne(portableQuery, {}, context)
					.then((result: E) => {
						return this.populateEntityGuidEntitiesAndUserAccounts<E>(
							portableQuery, [result])[0];
					})
			}
		)
	}

	private async ensureRepositoryPresenceAndCurrentState(
		context: IQueryOperationContext
	) {
		if (context.repository && context.repository.source && context.repository.GUID) {
			await this.repositoryLoader.loadRepository(context.repository.source, context.repository.GUID, context)
		}
	}

	private async populateEntityGuidEntitiesAndUserAccounts<E>(
		portableQuery: PortableQuery,
		entities: Array<E>
	): Promise<Array<E>> {
		if (!entities.length) {
			return
		}
		if (portableQuery.queryResultType !== QueryResultType.ENTITY_GRAPH
			&& portableQuery.queryResultType !== QueryResultType.ENTITY_TREE) {
			return
		}

		const dbEntity = this.airportDatabase.applications[portableQuery.applicationIndex]
			.currentVersion[0].applicationVersion.entities[portableQuery.tableIndex]

		const entityMapByRepositoryLocalId = new Map<Repository_LocalId, any[]>()
		const entityMapByActorRecordId = new Map<Actor_LocalId, any[]>()
		const actorsToRetrieveUserAccountForByLocalId = new Map<Actor_LocalId, IActor>()

		this.markEntities(entities, new Set(), entityMapByRepositoryLocalId,
			entityMapByActorRecordId, actorsToRetrieveUserAccountForByLocalId, dbEntity)

		await this.populateActorsAndUserAccounts(
			entityMapByActorRecordId,
			actorsToRetrieveUserAccountForByLocalId
		)
		await this.populateRepositories(entityMapByRepositoryLocalId)

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
							if (this.processRepositoryOrActor(dbProperty, propertyValue,
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
		dbProperty: DbProperty,
		propertyValue: any,
		entityMapByRepositoryLocalId: Map<Repository_LocalId, any[]>,
		entityMapByActorLocalId: Map<Actor_LocalId, any[]>,
		actorsToRetrieveUserAccountForByLocalId: Map<Actor_LocalId, IActor>
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
			if (!propertyValue[USER_ACCOUNT_PROPERTY_NAME]) {
				actorsToRetrieveUserAccountForByLocalId.set(propertyValue._localId, propertyValue)
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

	private async populateActorsAndUserAccounts(
		entityMapByActorRecordId: Map<Actor_LocalId, any[]>,
		actorsToRetrieveUserAccountForByLocalId: Map<Actor_LocalId, IActor>
	): Promise<void> {
		const actorIdSet = new Set<Actor_LocalId>()
		for (const actorLocalId of entityMapByActorRecordId.keys()) {
			actorIdSet.add(actorLocalId)
		}
		for (const actorLocalId of actorsToRetrieveUserAccountForByLocalId.keys()) {
			actorIdSet.add(actorLocalId)
		}
		const actorLocalIds: number[] = Array.from(actorIdSet)
		const actors = await this.actorDao.findWithUserAccountBy_LocalIdIn(actorLocalIds)
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
		entityMapByRepositoryLocalId: Map<Repository_LocalId, any[]>
	): Promise<void> {
		const repositoryLocalIds = Array.from(entityMapByRepositoryLocalId.keys())
		const repositories = await this.repositoryDao
			.findWithOwnerBy_LocalIdIn(repositoryLocalIds)

		for (const repository of repositories) {
			const entiesWithoutRepositoryObject = entityMapByRepositoryLocalId.get(repository._localId)
			for (const entity of entiesWithoutRepositoryObject) {
				entity.repository = repository
			}
		}
	}

}
