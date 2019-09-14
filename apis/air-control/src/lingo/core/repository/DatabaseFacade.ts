import {
	CascadeOverwrite,
	DbEntity,
	DistributionStrategy,
	ITransactionalConnector,
	PlatformType,
	PortableQuery,
	QueryResultType
}                        from '@airport/ground-control'
import {IObservable}     from '@airport/observe'
import {IAbstractQuery}  from '../../query/facade/AbstractQuery'
import {RawDelete}       from '../../query/facade/Delete'
import {
	RawInsertColumnValues,
	RawInsertValues
}                        from '../../query/facade/InsertValues'
import {
	RawUpdate,
	RawUpdateColumns
}                        from '../../query/facade/Update'
import {IFieldUtils}     from '../../utils/FieldUtils'
import {IQueryUtils}     from '../../utils/QueryUtils'
import {
	EntityIdData,
	ISchemaUtils
}                        from '../../utils/SchemaUtils'
import {IUpdateCache}    from '../data/UpdateCache'
import {UpdateCacheType} from '../data/UpdateCacheType'
import {
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
}                        from '../entity/Entity'


export interface UpdateRecord {
	newValue: any,
	originalValue: any;
	idData: EntityIdData;
}

export interface IFunctionWrapper<QF extends Function> {

	find: QF;

}

/**
 * Facade for all DB operations not related to a particular entity.
 */
export interface IDatabaseFacade {

	/**
	 * Name of the terminal
	 */
	name: string;

	/**
	 * Start Context for an UpdateProperties Operation.  All entity update operations must
	 * be performed on cached entities.
	 *
	 * This starts recording all queries and allows the update to diff recorded
	 * query results with the updated object to get the actual changed fields.
	 *
	 * @param {Entity} entities
	 */

	/*
		cacheForUpdate(
			cacheForUpdate: UpdateCacheType,
			dbEntity: DbEntity,
			...entities: any[]
		): void;
		*/

	addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
	): Promise<number>;

	/**
	 * Creates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records created (1 or 0)
	 */
	create<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entity: E,
		cascadeGraph?: CascadeOverwrite | EntityCascadeGraph
	): Promise<number>;

	/**
	 * Creates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records created
	 */
	bulkCreate<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entities: E[],
		checkIfProcessed: boolean, // defaults to true
		cascadeOverwrite: CascadeOverwrite | EntityCascadeGraph, // defaults to false
		ensureGeneratedValues?: boolean // for internal use only, needed at initial schema
	                                  // creation
	): Promise<number>;

	insertColumnValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
	): Promise<number>;

	insertValues<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
	): Promise<number>;

	insertColumnValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
	): Promise<number[] | string[] | number[][] | string[][]>;

	insertValuesGenerateIds<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
	): Promise<number[] | string[] | number[][] | string[][]>;

	/**
	 * Deletes an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records deleted (1 or 0)
	 */
	delete<E>(
		dbEntity: DbEntity,
		entity: E
	): Promise<number>;

	/**
	 * Creates an entity with a where clause - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records deleted
	 */
	deleteWhere<IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
	): Promise<number>;

	/**
	 * Ether creates or updates an entity - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records saved (1 or 0)
	 */
	save<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entity: E,
		cascadeGraph?: CascadeOverwrite | EntityCascadeGraph
	): Promise<number>;

	/**
	 * Updates an entity - internal API.  Use the API provided by the
	 * IEntityDatabaseFacade.
	 *
	 * @return Number of records updated (1 or 0)
	 */
	update<E, EntityCascadeGraph>(
		dbEntity: DbEntity,
		entity: E,
		cascadeGraph?: CascadeOverwrite | EntityCascadeGraph
	): Promise<number>;

	/**
	 * Updates an entity with a where clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawUpdateColumns: RawUpdateColumns<IEUC, IQE>
			| {
			(...args: any[]): RawUpdateColumns<IEUC, IQE>
		},
	): Promise<number>;

	/**
	 * Updates an entity with a where clause, using a property based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(
		dbEntity: DbEntity,
		rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
			(...args: any[]): RawUpdate<IEUP, IQE>
		},
	): Promise<number>;

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF>;

}

export interface IQueryFacade {

	// init(): Promise<void>;

	find<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		fieldUtils: IFieldUtils,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cacheForUpdate?: UpdateCacheType
	): Promise<EntityArray>;

	findOne<E>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		fieldUtils: IFieldUtils,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cacheForUpdate?: UpdateCacheType,
	): Promise<E>;

	search<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		fieldUtils: IFieldUtils,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cacheForUpdate?: UpdateCacheType,
	): Promise<IObservable<EntityArray>>;

	searchOne<E>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		fieldUtils: IFieldUtils,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cacheForUpdate?: UpdateCacheType,
	): Promise<IObservable<E>>;

	getPortableQuery<E>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): PortableQuery;

}
