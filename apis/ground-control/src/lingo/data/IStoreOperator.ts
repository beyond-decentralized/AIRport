import {IContext}      from '@airport/di'
import {SQLDataType}   from '../core/field/JSONClause'
import {PortableQuery} from '../query/PortableQuery'
import {DbColumn}      from '../schema/Property'

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
		ctx: IContext,
	): Promise<number>;

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		ctx: IContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		ctx: IContext,
		cachedSqlQueryId?: number,
	): Promise<E>;

	findNative(
		sqlQuery: string,
		parameters: any[],
		ctx: IContext,
	): Promise<any[]>;

	insertValues(
		portableQuery: PortableQuery,
		ctx: IContext,
		cachedSqlQueryId?: number,
	): Promise<number>;

	query(
		queryType: QueryType,
		query: string,
		params,
		ctx: IContext,
		saveTransaction?: boolean
	): Promise<any>;

	updateWhere(
		portableQuery: PortableQuery,
		internalFragments: InternalFragments,
		ctx: IContext,
	): Promise<number>;

	isValueValid(
		value: any,
		sqlDataType: SQLDataType,
		ctx: IContext,
	): boolean

}
