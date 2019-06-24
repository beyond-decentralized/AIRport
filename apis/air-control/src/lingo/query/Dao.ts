import {IEntityDatabaseFacade} from '../..'
import {
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
}                              from '../core/entity/Entity'

/**
 * Data access object.
 */
export interface IDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	IQE extends IQEntity> {

	db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId, IQE>

	// releaseCachedForUpdate(
	// 	updateCacheType: UpdateCacheType,
	// 	...entities: Entity[]
	// );

	bulkCreate(
		entities: EntityCreate[],
		cascade?: boolean,
		checkIfProcessed?: boolean
	): Promise<number>;

	count(): Promise<number>;

	/**
	 * Does not cascade?
	 * @param {EntityCreate[] | EntityCreate} entityInfo
	 * @returns {Promise<number>}
	 */
	create<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityInfo: EntityInfo
	): Promise<number>;

	delete(
		entityIdInfo: EntityId | EntityId[],
	): Promise<number>;

	deleteAll(): Promise<number>;

	exists(entityId: EntityId): Promise<boolean>;

	findAll(
		entityIds?: EntityId[]
	): Promise<Entity[]>;

	findAllAsTrees(
		entityIds?: EntityId[]
	): Promise<Entity[]>;

	findById(
		entityId: EntityId
	): Promise<Entity>;

	/**
	 * Either creates or updates the entity based entity
	 * state flag.  Cascades.
	 *
	 * @param {EntityCreate[] | EntityCreate} entityInfo
	 * @returns {Promise<number>}
	 */
	save<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityInfo: EntityInfo,
	): Promise<number>;

	/**
	 * Stages/caches the entity for later modifications (modifications
	 * are not saved and are just stored in memory).
	 *
	 * TODO: probably not needed since cache is now on each entity
	 *
	 * @param entity
	 * @returns {Promise<number>}
	 */
	// stage<EntityInfo extends EntityCreate | EntityCreate[]>(
	// 	entity: EntityInfo,
	// ): Promise<number>

	/**
	 * Does not cascade?
	 * @param {EntityCreate[] | EntityCreate} entityInfo
	 * @returns {Promise<number>}
	 */
	update(
		entityInfo: EntityCreate | EntityCreate[]
	): Promise<number>;

}
