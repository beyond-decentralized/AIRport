import { AirEntityUuId } from '@airport/aviation-communication'
import { IContext } from '@airport/direction-indicator'
import { IEntityStateManager, IAirEntity, ISaveResult } from '@airport/ground-control'
import { IAirportDatabase } from '../AirportDatabase'
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '../core/entity/Entity'
import { IDatabaseFacade } from '../core/repository/DatabaseFacade'
import { IEntityDatabaseFacade } from '../core/repository/EntityDatabaseFacade'
import { IUpdateCacheManager } from '../core/UpdateCacheManager'
import { ILookup } from './api/Lookup'

export type OperationName = string

/**
 * Data access object.
 */
export interface IDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity> {

	airportDatabase: IAirportDatabase
	databaseFacade: IDatabaseFacade
	entityStateManager: IEntityStateManager
	lookup: ILookup
	updateCacheManager: IUpdateCacheManager

	db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE>

	mapByUuId(
		entities: (Entity & IAirEntity)[]
	): Map<string, Entity>

	count(
		context?: IContext
	): Promise<number>;

	exists(
		entityId: EntityId,
		context?: IContext
	): Promise<boolean>;

	findAll(
		entityIds?: EntityId[],
		context?: IContext
	): Promise<Entity[]>;

	findAllAsTrees(
		entityIds?: EntityId[],
		context?: IContext
	): Promise<Entity[]>;

	findByUuId(
		airEntityId: AirEntityUuId | string,
		context?: IContext
	): Promise<Entity>;

	/**
	 * Either creates or updates the entity based entity
	 * state flag.  Cascades.
	 *
	 * @param {EntityCreate[] | EntityCreate} entityInfo
	 * @param context
	 * @returns {Promise<number>}
	 */
	save<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityInfo: EntityInfo,
		context?: IContext,
	): Promise<ISaveResult>;

	markForDeletion<EntityInfo extends EntityCreate | EntityCreate[]>(
		entityIdInfo: EntityInfo,
		context?: IContext,
	): void;

}
