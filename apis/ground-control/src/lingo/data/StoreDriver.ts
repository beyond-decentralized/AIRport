import { Observable } from "rxjs";
import { PortableQuery } from "../query/PortableQuery";
import { StoreType } from "./storeInfo";

/**
 * Created by Papa on 6/10/2016.
 */

export enum QueryType {
	DDL,
	SELECT,
	MUTATE
}

export interface ATransactionHistory {

}

export const INVALID_TABLE_NAME = 'A0ZA2vKHIAeI9506rYzCSFKYcSbSuLy5sRieHPnd2NevufFEx9CxuZsAdXieZBbRj5mPYypr3TGYwb6limMcTTWHOnsk7F6991890';

export interface IStoreDriver {

	type: StoreType;

	deleteWhere(
		portableQuery: PortableQuery,
	): Promise<number>;

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<E>;

	findNative(
		sqlQuery: string,
		parameters: any[]
	): Promise<any[]>;

	initialize(
		dbName: string
	): Promise<any>;

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

	saveTransaction(
		transaction: ATransactionHistory
	): Promise<any>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Observable<EntityArray>;

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Observable<E>;

	updateWhere(
		portableQuery: PortableQuery,
	): Promise<number>;

	startTransaction(): Promise<void>;

	commitTransaction(): Promise<void>;

	rollbackTransaction(): Promise<void>;

}
