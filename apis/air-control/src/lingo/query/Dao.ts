import {
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
}                          from '../core/entity/Entity'
import {IEntityFind}       from './api/EntityFind'
import {IEntityFindOne}    from './api/EntityFindOne'
import {UpdateCacheType}   from './api/EntityLookup'
import {IEntitySearch}     from './api/EntitySearch'
import {IEntitySearchOne}  from './api/EntitySearchOne'
import {MappedEntityArray} from './MappedEntityArray'

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

	find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;

	findOne: IEntityFindOne<Entity, EntitySelect>;

	search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;

	searchOne: IEntitySearchOne<Entity, EntitySelect>;

	releaseCachedForUpdate(
		updateCacheType: UpdateCacheType,
		...entities: Entity[]
	);

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
	 * @param entity
	 * @returns {Promise<number>}
	 */
	stage<EntityInfo extends EntityCreate | EntityCreate[]>(
		entity: EntityInfo,
	): Promise<number>

	/**
	 * Does not cascade?
	 * @param {EntityCreate[] | EntityCreate} entityInfo
	 * @returns {Promise<number>}
	 */
	update(
		entityInfo: EntityCreate | EntityCreate[]
	): Promise<number>;

}
