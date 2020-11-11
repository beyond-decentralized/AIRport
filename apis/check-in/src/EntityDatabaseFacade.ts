import {
	DB_FACADE,
	EntityFind,
	EntityFindOne,
	EntitySearch,
	EntitySearchOne,
	IDatabaseFacade,
	IDuo,
	IEntityCascadeGraph,
	IEntityContext,
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
	MappedEntityArray,
	OperationName,
	QSchema,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate
}                 from '@airport/air-control'
import {DI}       from '@airport/di'
import {DbEntity} from '@airport/ground-control'
import {Duo}      from './Duo'

/**
 * Created by Papa on 12/11/2016.
 */

export class EntityDatabaseFacade<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQ extends IQEntity>
	implements IEntityDatabaseFacade<Entity, EntitySelect,
		EntityCreate, EntityUpdateColumns,
		EntityUpdateProperties, EntityId,
		EntityCascadeGraph, IQ> {

	duo: IDuo<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId,
		EntityCascadeGraph, IQ>

	find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>

	findOne: IEntityFindOne<Entity, EntitySelect>

	search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>

	searchOne: IEntitySearchOne<Entity, EntitySelect>

	constructor(
		public dbEntity: DbEntity,
		private Q: QSchema
	) {
		this.duo       = new Duo(dbEntity)
		this.find      = new EntityFind<Entity, Array<Entity>, EntitySelect>(
			this.dbEntity)
		this.findOne   = new EntityFindOne<Entity, EntitySelect>(
			this.dbEntity)
		this.search    = new EntitySearch<Entity, Array<Entity>, EntitySelect>(
			this.dbEntity)
		this.searchOne = new EntitySearchOne(this.dbEntity)
	}

	get from(): IQ {
		return this.Q[this.dbEntity.name]
	}

	//
	// async releaseCachedForUpdate(
	// 	updateCacheType: UpdateCacheType,
	// 	...entities: Entity[]
	// ): Promise<void> {
	// 	const dbFacade = await DI.get(DB_FACADE)
	// 	return await dbFacade.releaseCachedForUpdate(updateCacheType, this.dbEntity,
	// ...entities) }

	async create(
		entity: EntityCreate,
		ctx?: IEntityContext,
		operationName?: OperationName
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.create(entity, ctx, operationName)
		})
	}

	async bulkCreate(
		entities: EntityCreate[],
		checkIfProcessed: boolean = true,
		ctx?: IEntityContext,
		operationName?: OperationName
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.bulkCreate(entities, ctx, checkIfProcessed, operationName)
		})
	}

	async insertColumnValues<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		ctx?: IEntityContext,
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.insertColumnValues(rawInsertColumnValues, ctx)
		})
	}

	async insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		ctx?: IEntityContext
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.insertValues(rawInsertValues, ctx)
		})
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		ctx?: IEntityContext,
	): Promise<number[] | string[] | number[][] | string[][]> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.insertColumnValuesGenerateIds(rawInsertColumnValues, ctx)
		})
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		ctx?: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.insertValuesGenerateIds(rawInsertValues, ctx)
		})
	}

	async update(
		entity: EntityCreate,
		ctx?: IEntityContext,
		operationName?: OperationName
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.update(entity, ctx, operationName)
		})
	}

	async updateColumnsWhere(
		rawUpdateColumns: RawUpdate<EntityUpdateColumns, IQ> | {
			(...args: any[])
				: RawUpdate<EntityUpdateColumns, IQ>
		},
		ctx?: IEntityContext
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.updateColumnsWhere(rawUpdateColumns, ctx)
		})
	}

	async updateWhere(
		rawUpdate: RawUpdate<EntityUpdateProperties, IQ> | {
			(...args: any[])
				: RawUpdate<EntityUpdateProperties, IQ>
		},
		ctx?: IEntityContext,
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.updateWhere(rawUpdate, ctx)
		})
	}

	// NOTE: Delete cascading is done on the server, no input is needed
	async delete(
		entity: EntityId,
		ctx?: IEntityContext,
		operationName?: OperationName
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.delete(entity, ctx, operationName)
		})
	}

	async deleteWhere(
		rawDelete: RawDelete<IQ> | { (...args: any[]): RawDelete<IQ> },
		ctx?: IEntityContext
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.deleteWhere(rawDelete, ctx)
		})
	}

	async save(
		entity: EntityCreate,
		ctx?: IEntityContext,
		operationName?: OperationName
	): Promise<number> {
		return await this.withDbEntity(ctx, async (
			databaseFacade: IDatabaseFacade
		) => {
			return await databaseFacade.save(entity, ctx, operationName)
		})
	}

	private async withDbEntity<R>(
		ctx: IEntityContext,
		callback: {
			(
				databaseFacade: IDatabaseFacade
			): Promise<R>
		}
	): Promise<R> {
		const databaseFacade = await DI.db()
			.get(DB_FACADE)
		const previousEntity = ctx.dbEntity
		ctx.dbEntity         = this.dbEntity
		try {

			return await callback(databaseFacade)
		} finally {
			ctx.dbEntity = previousEntity
		}
	}

}
