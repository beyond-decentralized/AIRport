import {
	EntityFind,
	EntityFindOne,
	EntitySearch,
	EntitySearchOne,
	IDatabaseFacade,
	IDmo,
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
	MappedEntityArray,
	QSchema,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	UpdateCacheType
}                 from "@airport/air-control";
import {DbEntity} from "@airport/ground-control";
import {Dmo}      from "./Dmo";

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

	common: IDatabaseFacade;
	dmo: IDmo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQ>;
	find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
	findOne: IEntityFindOne<Entity, EntitySelect>;
	search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;
	searchOne: IEntitySearchOne<Entity, EntitySelect>;

	constructor(
		public dbEntity: DbEntity,
		private Q: QSchema,
		private utils: IUtils
	) {
		this.dmo = new Dmo(dbEntity);
	}

	get from(): IQ {
		return this.Q[this.dbEntity.name];
	}

	initialize(
		databaseFacade: IDatabaseFacade
	) {
		this.common = databaseFacade;
		this.find = new EntityFind<Entity, Array<Entity>, EntitySelect>(
			this.dbEntity, databaseFacade, this.utils);
		this.findOne = new EntityFindOne(this.dbEntity, databaseFacade, this.utils);
		this.search = new EntitySearch<Entity, Array<Entity>, EntitySelect>(
			this.dbEntity, databaseFacade, this.utils);
		this.searchOne = new EntitySearchOne(this.dbEntity, databaseFacade, this.utils);
	}

	releaseCachedForUpdate(
		updateCacheType: UpdateCacheType,
		...entities: Entity[]
	): void {
		this.common.releaseCachedForUpdate(updateCacheType, this.dbEntity, ...entities);
	}

	async create(
		entity: EntityCreate
	): Promise<number> {
		return await this.common.create(this.dbEntity, entity);
	}

	async bulkCreate(
		entities: EntityCreate[],
		checkIfProcessed: boolean = true,
		cascade: boolean = false,
	): Promise<number> {
		return await this.common.bulkCreate(this.dbEntity, entities, checkIfProcessed, cascade);
	}

	async insertColumnValues<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}): Promise<number> {
		return await this.common.insertColumnValues(this.dbEntity, rawInsertColumnValues);
	}

	async insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		}): Promise<number> {
		return await this.common.insertValues(this.dbEntity, rawInsertValues);
	}

	async insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertColumnValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		}): Promise<number[] | string[]> {
		return await this.common.insertColumnValuesGenerateIds(this.dbEntity, rawInsertColumnValues);
	}

	async insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		}): Promise<number[] | string[]> {
		return await this.common.insertValuesGenerateIds(this.dbEntity, rawInsertValues);
	}


	async update(
		entity: EntityCreate
	): Promise<number> {
		return await this.common.update(this.dbEntity, entity);
	}

	async updateColumnsWhere(
		rawUpdateColumns: RawUpdate<EntityUpdateColumns, IQ> | {
			(...args: any[])
				: RawUpdate<EntityUpdateColumns, IQ>
		}
	): Promise<number> {
		return await this.common.updateColumnsWhere(this.dbEntity, rawUpdateColumns);
	}

	async updateWhere(
		rawUpdate: RawUpdate<EntityUpdateProperties, IQ> | {
			(...args: any[])
				: RawUpdate<EntityUpdateProperties, IQ>
		}
	): Promise<number> {
		return await this.common.updateWhere(this.dbEntity, rawUpdate);
	}

	async delete(
		entity: EntityId
	): Promise<number> {
		return await this.common.delete(this.dbEntity, entity);
	}

	async deleteWhere(
		rawDelete: RawDelete<IQ> | { (...args: any[]): RawDelete<IQ> }
	): Promise<number> {
		return await this.common.deleteWhere(this.dbEntity, rawDelete);
	}

	async save(
		entity: EntityCreate
	): Promise<number> {
		return await this.common.save(this.dbEntity, entity);
	}

}
