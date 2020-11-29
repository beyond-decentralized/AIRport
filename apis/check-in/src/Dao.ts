import {
	doEnsureContext,
	ENTITY_STATE_MANAGER,
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
import {
	DI,
	IContext
} from '@airport/di'
import {EntityId as DbEntityId} from '@airport/ground-control'
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

	async count(
		context?: IContext
	): Promise<number> {
		throw new Error(`Not Implemented`)
	}

	exists(
		entityId: EntityId,
		context?: IContext
	): Promise<boolean> {
		throw new Error(`Not Implemented`)
	}

	async findAll(
		entityIds?: EntityId[],
		context?: IContext,
		cacheForUpdate: boolean = false
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`)
		}
		return await this.db.find.graph({
			select: <any>{},
			from: [this.db.from],
		}, context)
	}

	async findAllAsTrees(
		entityIds?: EntityId[],
		context?: IContext,
		cacheForUpdate: boolean = false
	): Promise<Entity[]> {
		if (entityIds) {
			throw new Error(`Not implemented`)
		}
		return await this.db.find.tree({
			select: <any>{},
			from: [this.db.from],
		}, context)
	}

	findById(
		entityId: EntityId,
		context?: IContext,
		cacheForUpdate: boolean = false
	): Promise<Entity> {
		throw new Error(`Not implemented`)
	}

	async save<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo,
		context?: IContext,
		operationName?: OperationName
	): Promise<number> {
		if (entity instanceof Array) {
			throw new Error(`Not Implemented`)
		} else {
			const result = await this.db.save(<EntityCreate>entity,
				this.ensureContext(context), operationName)

			return result
		}
	}

	markForDeletion<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityIdInfo: EntityInfo,
		context?: IContext,
	): void {
		const entityStateManager = DI.db().getSync(ENTITY_STATE_MANAGER)
		if (entityIdInfo instanceof Array) {
			for(const anEntity of entityIdInfo) {
				entityStateManager.markForDeletion(anEntity)
			}
		} else {
			entityStateManager.markForDeletion(entityIdInfo)
		}
	}

	private ensureContext(
		context: IContext
	): IEntityContext {
		return doEnsureContext(context) as IEntityContext
	}
}
