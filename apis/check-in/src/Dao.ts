import {
	doEnsureContext,
	IDao,
	IEntityCascadeGraph,
	IEntityContext,
	IEntityCreateProperties,
	IEntityDatabaseFacade,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	OperationName,
	QSchema
} from '@airport/air-control'
import {IContext}             from '@airport/di'
import {
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
		checkIfProcessed: boolean          = true,
		ctx?: IContext,
		operationName?: OperationName
	): Promise<number> {
		const result = await this.db.bulkCreate(entities,
			checkIfProcessed, this.ensureContext(ctx), operationName)

		return result
	}

	async count(
		ctx?: IContext
	): Promise<number> {
		throw new Error(`Not Implemented`)
	}

	async create<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityInfo: EntityInfo,
		ctx?: IContext,
		operationName?: OperationName
	): Promise<number> {
		if (entityInfo instanceof Array) {
			return await this.db.bulkCreate(entityInfo,
				true, this.ensureContext(ctx), operationName)
		} else {
			const result = await this.db.create(<EntityCreate>entityInfo,
				this.ensureContext(ctx), operationName)

			return result
		}
	}

	async delete(
		entityIdInfo: EntityId | EntityId[],
		ctx?: IContext,
		operationName?: OperationName
	): Promise<number> {
		if (entityIdInfo instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			return await this.db.delete(entityIdInfo,
				this.ensureContext(ctx), operationName)
		}
	}

	async deleteAll(
		ctx?: IContext
	): Promise<number> {
		throw new Error(`Not Implemented`)
	}

	exists(
		entityId: EntityId,
		ctx?: IContext
	): Promise<boolean> {
		throw new Error(`Not Implemented`)
	}

	async findAll(
		entityIds?: EntityId[],
		ctx?: IContext,
		cacheForUpdate: boolean = false
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`)
		}
		return await this.db.find.graph({
			select: <any>{},
			from: [this.db.from],
		}, ctx)
	}

	async findAllAsTrees(
		entityIds?: EntityId[],
		ctx?: IContext,
		cacheForUpdate: boolean = false
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`)
		}
		return await this.db.find.tree({
			select: <any>{},
			from: [this.db.from],
		}, ctx)
	}

	findById(
		entityId: EntityId,
		ctx?: IContext,
		cacheForUpdate: boolean = false
	): Promise<Entity> {
		throw new Error(`Not implemented`)
	}

	async save<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo,
		ctx?: IContext,
		operationName?: OperationName
	): Promise<number> {
		if (entity instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			const result = await this.db.save(<EntityCreate>entity,
				this.ensureContext(ctx), operationName)

			return result
		}
	}

	async update(
		entityInfo: EntityCreate | EntityCreate[],
		ctx?: IContext,
		operationName?: OperationName
	): Promise<number> {
		if (entityInfo instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			return await this.db.update(entityInfo, this.ensureContext(ctx), operationName)
		}
	}

	private ensureContext(
		ctx: IContext
	): IEntityContext {
		return doEnsureContext(ctx) as IEntityContext
	}
}
