import {
	IDao,
	IEntityCreateProperties,
	IEntityDatabaseFacade,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	QSchema
}                             from '@airport/air-control'
import {
	CascadeOverwrite,
	EntityId as DbEntityId
}                             from '@airport/ground-control'
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

	db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId, QE>

	constructor(
		dbEntityId: DbEntityId,
		Q: QSchema
	) {
		const dbEntity = Q.__dbSchema__.currentVersion.entities[dbEntityId]
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		this.db        = new EntityDatabaseFacade<Entity,
			EntitySelect, EntityCreate,
			EntityUpdateColumns, EntityUpdateProperties, EntityId, QE>(
			dbEntity, Q)
	}

	async bulkCreate(
		entities: EntityCreate[],
		cascadeOverwrite: CascadeOverwrite = CascadeOverwrite.DEFAULT,
		checkIfProcessed: boolean          = true
	): Promise<number> {
		return await this.db.bulkCreate(entities,
			cascadeOverwrite, checkIfProcessed)
	}

	async count(): Promise<number> {
		throw new Error(`Not Implemented`)
	}

	async create<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityInfo: EntityInfo
	): Promise<number> {
		if (entityInfo instanceof Array) {
			return await this.db.bulkCreate(entityInfo,
				CascadeOverwrite.DEFAULT, true)
		} else {
			return await this.db.create(<EntityCreate>entityInfo)
		}
	}

	async delete(
		entityIdInfo: EntityId | EntityId[],
	): Promise<number> {
		if (entityIdInfo instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			return await this.db.delete(entityIdInfo)
		}
	}

	async deleteAll(): Promise<number> {
		throw new Error(`Not Implemented`)
	}

	exists(entityId: EntityId): Promise<boolean> {
		throw new Error(`Not Implemented`)
	}

	async findAll(
		entityIds?: EntityId[],
		cacheForUpdate: boolean = false
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`)
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
			throw new Error(`Not implemented`)
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
		throw new Error(`Not implemented`)
	}

	async save<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo,
	): Promise<number> {
		if (entity instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			return await this.db.save(<EntityCreate>entity)
		}
	}

	async stage<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo,
	): Promise<number> {
		if (entity instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			throw new Error(`Not Implemented`)
		}
	}

	async update(
		entityInfo: EntityCreate | EntityCreate[]
	): Promise<number> {
		if (entityInfo instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			return await this.db.update(entityInfo)
		}
	}

}
