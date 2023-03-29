import {
	EntityIdData,
	ISaveResult,
	PortableQuery,
	QueryResultType,
	Repository_GUID
} from '@airport/ground-control';
import {
	IAbstractQuery,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IQEntity,
	IQueryContext,
	RawDelete,
	RawInsertColumnValues,
	RawInsertValues,
	RawUpdate,
	RawUpdateColumns
} from '@airport/tarmaq-query';
import { Observable } from 'rxjs';
import { IEntityContext } from '@airport/tarmaq-entity';

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

	insertColumnValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IEntityContext
	): Promise<number>;

	insertValues<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
		context: IEntityContext
	): Promise<number>;

	insertColumnValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertColumnValues<IQE> | {
			(...args: any[]): RawInsertColumnValues<IQE>;
		},
		context: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]>;

	insertValuesGenerateIds<IQE extends IQEntity>(
		rawInsertValues: RawInsertValues<IQE> | {
			(...args: any[]): RawInsertValues<IQE>
		},
		context: IEntityContext
	): Promise<number[] | string[] | number[][] | string[][]>;

	/**
	 * Creates an entity with a WHERE clause - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records deleted
	 */
	deleteWhere<IQE extends IQEntity>(
		rawDelete: RawDelete<IQE> | {
			(...args: any[]): RawDelete<IQE>
		},
		context: IEntityContext,
		trackedRepoGUIDSet?: Set<Repository_GUID>
	): Promise<number>;

	/**
	 * Ether creates or updates an entity - internal API.  Use the
	 *  API provided by the IEntityDatabaseFacade.
	 *
	 * @return ISaveResult object with metadata on saved objects
	 */
	save<E>(
		entity: E,
		context: IEntityContext,
	): Promise<ISaveResult>;

	/**
	 * Updates an entity with a WHERE clause, using a column based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	updateColumnsWhere<IEUC extends IEntityUpdateColumns, IQE extends IQEntity>(
		rawUpdateColumns: RawUpdateColumns<IEUC, IQE>
			| {
				(...args: any[]): RawUpdateColumns<IEUC, IQE>
			},
		context: IEntityContext,
		trackedRepoGUIDSet?: Set<Repository_GUID>
	): Promise<number>;

	/**
	 * Updates an entity with a WHERE clause, using a property based set clause
	 * - internal API.  Use the API provided by the IEntityDatabaseFacade.
	 *
	 * @return Number of records updated
	 */
	updateWhere<IEUP extends IEntityUpdateProperties, IQE extends IQEntity>(
		rawUpdate: RawUpdate<IEntityUpdateProperties, IQE> | {
			(...args: any[]): RawUpdate<IEUP, IQE>
		},
		context: IEntityContext,
		trackedRepoGUIDSet?: Set<Repository_GUID>
	): Promise<number>;

	prepare<QF extends Function>(
		queryFunction: QF
	): IFunctionWrapper<QF>;

}

export interface IQueryFacade {

	find<E, EntityArray extends Array<E>>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IEntityContext,
	): Promise<EntityArray>;

	findOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IEntityContext,
	): Promise<E>;

	search<E, EntityArray extends Array<E>>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IEntityContext,
	): Observable<EntityArray>;

	searchOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IEntityContext,
	): Observable<E>;

	getPortableQuery<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IEntityContext
	): PortableQuery;

}
