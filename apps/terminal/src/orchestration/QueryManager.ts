import {
	IStoreDriver,
	PortableQuery
}                   from "@airport/ground-control";
import {Observable} from 'rxjs';
import {
	Inject,
	Service
}                   from "typedi";
import {
	QueryManagerToken,
	StoreDriverToken
}                   from "../InjectionTokens";

export interface IQueryManager {


	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<E>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery
	): Observable<EntityArray>;

	searchOne<E>(
		portableQuery: PortableQuery
	): Observable<E>;

}

@Service(QueryManagerToken)
export class QueryManager
	implements IQueryManager {

	constructor(
		@Inject(
			_ => StoreDriverToken)
		private dataStore: IStoreDriver,
	) {
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<EntityArray> {
		return await this.dataStore.find<E, EntityArray>(portableQuery, cachedSqlQueryId);
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number
	): Promise<E> {
		return await this.dataStore.findOne<E>(portableQuery, cachedSqlQueryId);
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Observable<EntityArray> {
		return this.dataStore.search<E, EntityArray>(portableQuery, cachedSqlQueryId);
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Observable<E> {
		return this.dataStore.searchOne<E>(portableQuery, cachedSqlQueryId);
	}

}