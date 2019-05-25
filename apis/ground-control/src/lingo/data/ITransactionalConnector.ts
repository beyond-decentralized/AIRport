import {IObservable}    from "@airport/observe";
import {PortableQuery} from "../query/PortableQuery";

export interface ITransactionalConnector {

	transact(
	): Promise<void>;

	rollback(
	): Promise<void>;

	commit(
	): Promise<void>;

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<E>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<EntityArray>;

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<E>;

	insertValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number>;

	insertValuesGetIds(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number[] | string[]>;

	updateValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number>;

	deleteWhere(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number>;

}
