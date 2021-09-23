import type { IContext } from "@airport/di"
import type { PortableQuery } from "@airport/ground-control"
import type { Observable } from "rxjs"

export interface IQueryManager {

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
		cachedSqlQueryId?: number
	): Promise<E>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IContext,
	): Observable<EntityArray>;

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IContext,
	): Observable<E>;

}
