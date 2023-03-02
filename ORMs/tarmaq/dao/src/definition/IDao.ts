import { AirEntityId } from '@airport/aviation-communication'
import { IContext } from '@airport/direction-indicator'
import { IEntityStateManager, IAirEntity, ISaveResult, DbEntity } from '@airport/ground-control'
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
} from '@airport/tarmaq-query'
import { IDatabaseFacade } from './IDatabaseFacade'
import { IEntityDatabaseFacade } from './IEntityDatabaseFacade'
import { IFieldsSelect } from './IFieldsSelect'
import { ILookup } from './query/ILookup'

export type OperationName = string

/**
 * Data access object.
 */
export interface IDao<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreate extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	DbEntity_LocalId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQE extends IQEntity> {

	databaseFacade: IDatabaseFacade
	entityStateManager: IEntityStateManager
	lookup: ILookup
	updateCacheManager: {
		saveOriginalValues(
			result: any,
			dbEntity: DbEntity
		)
	}

	db: IEntityDatabaseFacade<Entity, EntitySelect, EntityCreate,
		EntityUpdateColumns, EntityUpdateProperties, DbEntity_LocalId, EntityCascadeGraph, IQE>


	SELECT: IFieldsSelect<EntitySelect>

	mapById(
		entities: (Entity & IAirEntity)[]
	): Map<string, Entity>

	count(
		context?: IContext
	): Promise<number>;

	exists(
		entityId: DbEntity_LocalId,
		context?: IContext
	): Promise<boolean>;

	findAll(
		entityIds?: DbEntity_LocalId[],
		context?: IContext
	): Promise<Entity[]>;

	findAllAsTrees(
		entityIds?: DbEntity_LocalId[],
		context?: IContext
	): Promise<Entity[]>;

	findOne(
		airEntityId: Entity | AirEntityId | string,
		forUpdate?: boolean,
		context?: IContext
	): Promise<Entity>;

	findIn(
		airEntityIds: Entity[] | AirEntityId[] | string[],
		forUpdate?: boolean,
		context?: IContext
	): Promise<Entity[]>;

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
