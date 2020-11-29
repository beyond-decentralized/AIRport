import {DbEntity}          from '@airport/ground-control'
import {IEntityFind}       from '../../query/api/EntityFind'
import {IEntityFindOne}    from '../../query/api/EntityFindOne'
import {IEntitySearch}     from '../../query/api/EntitySearch'
import {IEntitySearchOne}  from '../../query/api/EntitySearchOne'
import {OperationName}     from '../../query/Dao'
import {IDuo}              from '../../query/Duo'
import {RawDelete}         from '../../query/facade/Delete'
import {
	RawInsertColumnValues,
	RawInsertValues
}                          from '../../query/facade/InsertValues'
import {
	RawUpdate,
	RawUpdateColumns
}                          from '../../query/facade/Update'
import {MappedEntityArray} from '../../query/MappedEntityArray'
import {IEntityContext}    from '../data/EntityContext'
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity
}                          from '../entity/Entity'

/**
 * Facade for all DB operations related to a particular Entity.
 */
export interface IEntityDatabaseFacade<Entity,
	EntitySelect extends IEntitySelectProperties,
	EntityCreateProperties extends IEntityCreateProperties,
	EntityUpdateColumns extends IEntityUpdateColumns,
	EntityUpdateProperties extends IEntityUpdateProperties,
	EntityId extends IEntityIdProperties,
	EntityCascadeGraph extends IEntityCascadeGraph,
	IQ extends IQEntity> {

	dbEntity: DbEntity;

	duo: IDuo<Entity, EntitySelect, EntityCreateProperties,
		EntityUpdateColumns, EntityUpdateProperties, EntityId,
		EntityCascadeGraph, IQ>;

	/**
	 * The Promise based API for all Entity 'find' (find many) queries.
	 */
	find: IEntityFind<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;

	/**
	 * The Promise based API for all Entity 'findOne' queries.
	 */
	findOne: IEntityFindOne<Entity, EntitySelect>;

	/**
	 * The Observable based API for all Entity 'searchOne' (searchOne many) queries.
	 */
	search: IEntitySearch<Entity, Array<Entity> | MappedEntityArray<Entity>, EntitySelect>;

	/**
	 * The Observable based API for all Entity 'searchOne' queries.
	 */
	searchOne: IEntitySearchOne<Entity, EntitySelect>;

	/**
	 * Creates a new instance of the Query Entity for this entity type.
	 */
	from: IQ;

	/**
	 * Releases UpdateProperties Cache for entities that haven't been released
	 * via an update call.
	 *
	 * @param {Entity} entities
	 */

	/*
		releaseCachedForUpdate(
			updateCacheType: UpdateCacheType,
			...entities: Entity[]
		): Promise<void>;
		*/

	insertColumnValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		ctx?: IEntityContext
	): Promise<number>;

	insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		ctx?: IEntityContext
	): Promise<number>;

	insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		ctx?: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]>;

	insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>;
		},
		ctx?: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]>;

	/**
	 * Updates this entity type based on an UPDATE WHERE Query,
	 * with a column based set clause.
	 *
	 * @return Number of records updated
	 */
	updateColumnsWhere(
		rawUpdateColumns: RawUpdateColumns<EntityUpdateColumns, IQ>
			| { (...args: any[]): RawUpdateColumns<EntityUpdateColumns, IQ> },
		ctx?: IEntityContext
	): Promise<number>;

	/**
	 * Updates this entity type based on an UPDATE WHERE Query (),
	 * with a property based set clause.
	 *
	 * @return Number of records updated
	 */
	updateWhere(
		rawUpdateProperties: RawUpdate<EntityUpdateProperties, IQ> | { (...args: any[]): RawUpdate<EntityUpdateProperties, IQ> },
		ctx?: IEntityContext
	): Promise<number>;

	/**
	 * Deletes this entity type based on an DELETE WHERE Query.
	 *
	 * @return Number of records deleted
	 */
	deleteWhere(
		rawDelete: RawDelete<IQ> | { (...args: any[]): RawDelete<IQ> },
		ctx?: IEntityContext
	): Promise<number>;

	/**
	 * Creates or Updates the provided entity in the db.  Uses the DB
	 * UpdateProperties Context to determine if the entity needs to be updated.
	 * If the entity isn't found in the update context, creates it.
	 *
	 * @return Number of records saved (1 or 0)
	 */
	save(
		entity: EntityCreateProperties,
		ctx?: IEntityContext,
		operationName?: OperationName
	): Promise<number>;

}
