import {
	IDao,
	IEntityCreateProperties,
	IEntityDatabaseFacade,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	QSchema,
	RawEntityQuery,
	UpdateCacheType
}                               from '@airport/air-control'
import {EntityId as DbEntityId} from '@airport/ground-control'
import {IObservable}            from '@airport/observe'
import {EntityDatabaseFacade}   from './EntityDatabaseFacade'

/**
 * Created by Papa on 8/26/2017.
 */
export abstract class Dao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	QE extends IQEntity>
	implements IDao<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId, QE> {

	private db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId, QE>

	constructor(
		dbEntityId: DbEntityId,
		Q: QSchema
	) {
		const dbEntity             = Q.__dbSchema__.currentVersion.entities[dbEntityId]
		const entityDatabaseFacade = new EntityDatabaseFacade<Entity,
			EntitySelect, EntityCreate,
			EntityUpdateColumns, EntityUpdateProperties, EntityId, QE>(
			dbEntity, Q)
		entityDatabaseFacade.initialize()

		this.db = entityDatabaseFacade
	}

	async findAsGraph(
		rawTreeQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> }
	): Promise<Array<Entity>> {
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		return await this.db.find.graph(rawTreeQuery)
	}

	async findAsTree(
		rawTreeQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> }
	): Promise<Array<Entity>> {
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		return await this.db.find.tree(rawTreeQuery)
	}

	async findOneAsGraph(
		rawTreeQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> }
	): Promise<Entity> {
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		return await this.db.findOne.graph(rawTreeQuery)
	}

	async findOneAsTree(
		rawTreeQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> }
	): Promise<Entity> {
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		return await this.db.findOne.tree(rawTreeQuery)
	}

	searchAsGraph(
		rawTreeQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> }
	): IObservable<Array<Entity>> {
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		return this.db.search.graph(rawTreeQuery)
	}

	searchAsTree(
		rawTreeQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> }
	): IObservable<Array<Entity>> {
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		return this.db.search.tree(rawTreeQuery)
	}

	searchOneAsGraph(
		rawTreeQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> }
	): IObservable<Entity> {
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		return this.db.searchOne.graph(rawTreeQuery)
	}

	searchOneAsTree(
		rawTreeQuery: RawEntityQuery<EntitySelect> | { (...args: any[]): RawEntityQuery<EntitySelect> }
	): IObservable<Entity> {
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		return this.db.searchOne.tree(rawTreeQuery)
	}

	releaseCachedForUpdate(
		updateCacheType: UpdateCacheType,
		...entities: Entity[]
	) {
		return this.db.releaseCachedForUpdate(updateCacheType, ...entities)
	}

	async bulkCreate(
		entities: EntityCreate[],
		cascade: boolean          = false,
		checkIfProcessed: boolean = true
	): Promise<number> {
		return await this.db.bulkCreate(entities, cascade, checkIfProcessed)
	}

	async count(): Promise<number> {
		throw `Not Implemented`
	}

	async create<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityInfo: EntityInfo
	): Promise<number> {
		if (entityInfo instanceof Array) {
			return await this.bulkCreate(entityInfo)
		} else {
			return await this.db.create(<EntityCreate>entityInfo)
		}
	}

	async delete(
		entityIdInfo: EntityId | EntityId[],
	): Promise<number> {
		if (entityIdInfo instanceof Array) {
			throw `Not Implemented`
		} else {
			return await this.db.delete(entityIdInfo)
		}
	}

	async deleteAll(): Promise<number> {
		throw `Not Implemented`
	}

	exists(entityId: EntityId): Promise<boolean> {
		throw `Not Implemented`
	}

	async findAll(
		entityIds?: EntityId[],
		cacheForUpdate: boolean = false
	): Promise<Entity[]> {
		if (entityIds) {
			throw `Not implemented`
		}
		return await this.db.find.graph({
			select: <any>{},
			from: [this.db.from],
		})
	}

	async findAllAsTrees(
		entityIds?: EntityId[],
		cacheForUpdate: boolean = false
	): Promise<Entity[]> {
		if (entityIds) {
			throw `Not implemented`
		}
		return await this.db.find.tree({
			select: <any>{},
			from: [this.db.from],
		})
	}

	findById(
		entityId: EntityId,
		cacheForUpdate: boolean = false
	): Promise<Entity> {
		throw `Not implemented`
	}

	async save<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo,
	): Promise<number> {
		if (entity instanceof Array) {
			throw `Not Implemented`
		} else {
			return await this.db.save(<EntityCreate>entity)
		}
	}

	async stage<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo,
	): Promise<number> {
		if (entity instanceof Array) {
			throw `Not Implemented`
		} else {
			throw `Not Implemented`
		}
	}

	async update(
		entityInfo: EntityCreate | EntityCreate[]
	): Promise<number> {
		if (entityInfo instanceof Array) {
			throw `Not Implemented`
		} else {
			return await this.db.update(entityInfo)
		}
	}

}
