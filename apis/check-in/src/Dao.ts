import {
	IDao,
	IEntityCascadeGraph,
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
	EntityCascadeGraph extends IEntityCascadeGraph,
	QE extends IQEntity>
	implements IDao<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId,
		EntityCascadeGraph, QE> {

	db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId,
		EntityCascadeGraph, QE>

	staged: Set<Entity> = new Set()

	constructor(
		dbEntityId: DbEntityId,
		Q: QSchema
	) {
		const dbEntity = Q.__dbSchema__.currentVersion.entities[dbEntityId]
		// TODO: figure out how to inject EntityDatabaseFacade and dependencies
		this.db        = new EntityDatabaseFacade<Entity,
			EntitySelect, EntityCreate,
			EntityUpdateColumns, EntityUpdateProperties, EntityId,
			EntityCascadeGraph, QE>(
			dbEntity, Q)
	}

	async bulkCreate(
		entities: EntityCreate[],
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT,
		checkIfProcessed: boolean          = true
	): Promise<number> {
		const result = await this.db.bulkCreate(entities,
			cascadeOverwrite, checkIfProcessed)

		for(const entity of entities) {
			this.staged.delete(entity as any)
		}

		return result
	}

	async count(): Promise<number> {
		throw new Error(`Not Implemented`)
	}

	async create<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityInfo: EntityInfo,
		cascadeGraph: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT
	): Promise<number> {
		if (entityInfo instanceof Array) {
			return await this.db.bulkCreate(entityInfo,
				CascadeOverwrite.DEFAULT, true)
		} else {
			const result = await this.db.create(<EntityCreate>entityInfo, cascadeGraph)
			this.staged.delete(entityInfo as any)

			return result
		}
	}

	async delete(
		entityIdInfo: EntityId | EntityId[],
		cascadeGraph: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT
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
		cascadeGraph: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT
	): Promise<number> {
		if (entity instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			const result = await this.db.save(<EntityCreate>entity, cascadeGraph)
			this.staged.delete(entity as any)

			return result
		}
	}

	async stage<EntityInfo extends Entity | Entity[]>(
		entity: EntityInfo
	): Promise<void> {
		if (entity instanceof Array) {
			for(const anEntity of entity){
				this.staged.add(anEntity)
			}
		} else {
				this.staged.add(entity as Entity)
		}
	}

	async update(
		entityInfo: EntityCreate | EntityCreate[],
		cascadeGraph: CascadeOverwrite | EntityCascadeGraph = CascadeOverwrite.DEFAULT
	): Promise<number> {
		if (entityInfo instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			return await this.db.update(entityInfo, cascadeGraph)
		}
	}

}
