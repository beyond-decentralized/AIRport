import type { PortableQuery } from "@airport/ground-control"
import type { Observable } from "rxjs"
import { IQueryOperationContext } from "../processing/IOperationContext"

export interface IQueryManager {

	find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<EntityArray>;

	findOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
		cachedSqlQueryId?: number
	): Promise<E>;

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
	): Observable<EntityArray>;

	searchOne<E>(
		portableQuery: PortableQuery,
		context: IQueryOperationContext,
	): Observable<E>;

}
