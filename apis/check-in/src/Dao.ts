import {
	AIR_DB,
	IAirportDatabase,
	IDao,
	IEntityCreateProperties,
	IEntityDatabaseFacade,
	IEntityFind,
	IEntityFindOne,
	IEntityIdProperties,
	IEntitySearch,
	IEntitySearchOne,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	IUtils,
	QSchema,
	UpdateCacheType,
	UTILS
}                             from '@airport/air-control'
import {DI}                   from '@airport/di'
import {DbEntity}             from '@airport/ground-control'
import {EntityDatabaseFacade} from './EntityDatabaseFacade'

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

	protected db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId, QE>

	protected utils: IUtils
	protected airDb: IAirportDatabase

	constructor(
		dbEntity: DbEntity,
		Q: QSchema
	) {
		DI.get(
			(
				airportDatabase,
				utils
			) => {
				this.airDb = airportDatabase
				this.utils = utils
				this.db    = new EntityDatabaseFacade<Entity,
					EntitySelect, EntityCreate,
					EntityUpdateColumns, EntityUpdateProperties, EntityId, QE>(
					dbEntity, Q, this.utils)
			}, AIR_DB, UTILS)
	}

	get find(): IEntityFind<Entity, Array<Entity>, EntitySelect> {
		return this.db.find
	}

	get findOne(): IEntityFindOne<Entity, EntitySelect> {
		return this.db.findOne
	}

	get search(): IEntitySearch<Entity, Array<Entity>, EntitySelect> {
		return this.db.search
	}

	get searchOne(): IEntitySearchOne<Entity, EntitySelect> {
		return this.db.searchOne
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
