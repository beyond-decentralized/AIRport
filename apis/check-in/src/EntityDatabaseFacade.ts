import {
	DB_FACADE,
	EntityFindOne,
	EntityFind,
	EntitySearchOne,
	EntitySearch,
	IDuo,
	IEntityCreateProperties,
	IEntityDatabaseFacade,
	IEntityFindOne,
	IEntityFind,
	IEntityIdProperties,
	IEntitySearchOne,
	IEntitySearch,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	MappedEntityArray,
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
	IQ extends IQEntity>
	implements IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, IQ> {

	duo: IDuo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQ>

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
		entity: EntityCreate
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.create(this.dbEntity, entity)
	}

	async bulkCreate(
		entities: EntityCreate[],
		cascade: boolean          = false,
		checkIfProcessed: boolean = true
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.bulkCreate(this.dbEntity, entities, checkIfProcessed, cascade)
	}

	async insertColumnValues<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.insertColumnValues(this.dbEntity, rawInsertColumnValues)
	}

	async insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		}): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.insertValues(this.dbEntity, rawInsertValues)
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}): Promise<number[] | string[]> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.insertColumnValuesGenerateIds(this.dbEntity, rawInsertColumnValues)
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		}): Promise<number[] | string[]> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.insertValuesGenerateIds(this.dbEntity, rawInsertValues)
	}

	async update(
		entity: EntityCreate
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.update(this.dbEntity, entity)
	}

	async updateColumnsWhere(
		rawUpdateColumns: RawUpdate<EntityUpdateColumns, IQ> | {
			(...args: any[])
				: RawUpdate<EntityUpdateColumns, IQ>
		}
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.updateColumnsWhere(this.dbEntity, rawUpdateColumns)
	}

	async updateWhere(
		rawUpdate: RawUpdate<EntityUpdateProperties, IQ> | {
			(...args: any[])
				: RawUpdate<EntityUpdateProperties, IQ>
		}
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.updateWhere(this.dbEntity, rawUpdate)
	}

	async delete(
		entity: EntityId
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.delete(this.dbEntity, entity)
	}

	async deleteWhere(
		rawDelete: RawDelete<IQ> | { (...args: any[]): RawDelete<IQ> }
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.deleteWhere(this.dbEntity, rawDelete)
	}

	async save(
		entity: EntityCreate
	): Promise<number> {
		const dbFacade = await DI.get(DB_FACADE)
		return await dbFacade.save(this.dbEntity, entity)
	}

}
