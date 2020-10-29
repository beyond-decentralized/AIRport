import {SQLDataType}         from '../core/field/JSONClause'
import {PortableQuery}       from '../query/PortableQuery'
import {DbColumn}            from '../schema/Property'

export enum QueryType {
	DDL,
	SELECT,
	MUTATE
}

export interface ATransactionHistory {

}

export interface InternalSetFragment {
	column: DbColumn;
	value: any;
}

export interface InternalFragments {
	SELECT?: DbColumn[];
	SET?: InternalSetFragment[];
}

export interface IStoreOperator {

	deleteWhere(
		portableQuery: PortableQuery,
	): Promise<number>;

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number,
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		cachedSqlQueryId?: number,
	): Promise<E>;

	findNative(
		sqlQuery: string,
		parameters: any[]
	): Promise<any[]>;

	insertValues(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<number>;

	query(
		queryType: QueryType,
		query: string,
		params,
		saveTransaction?: boolean
	): Promise<any>;

	updateWhere(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments
	): Promise<number>;

	isValueValid(
		value: any,
		sqlDataType: SQLDataType
	): boolean

}
