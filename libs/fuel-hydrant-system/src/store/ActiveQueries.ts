import {DI}             from '@airport/di'
import {
	PortableQuery,
	SyncSchemaMap
}                       from '@airport/ground-control'
import {Subject}       from 'rxjs'
import {SQLQuery}       from '../sql/core/SQLQuery'
import {ACTIVE_QUERIES} from '../tokens'

/**
 * Created by shamsutdinov.artem on 8/8/2016.
 */
export interface IActiveQueries {

	queries: Map<PortableQuery, CachedSQLQuery>;

	add(
		portableQuery: PortableQuery,
		cachedSqlQuery: CachedSQLQuery
	): void;

	remove(
		portableQuery: PortableQuery
	): void;

	markQueriesToRerun(
		schemaMap: SyncSchemaMap
	): void;

	rerunQueries( //
	): void;

}

export class ActiveQueries
	implements IActiveQueries {

	queries: Map<PortableQuery, CachedSQLQuery> = new Map<PortableQuery, CachedSQLQuery>()

	add(
		portableQuery: PortableQuery,
		cachedSqlQuery: CachedSQLQuery
	): void {
		this.queries.set(portableQuery, cachedSqlQuery)
	}

	remove(
		portableQuery: PortableQuery
	): void {
		this.queries.delete(portableQuery)
	}

	markQueriesToRerun(
		schemaMap: SyncSchemaMap
	): void {
		this.queries.forEach((cachedSqlQuery) => {
			if (schemaMap.intersects(cachedSqlQuery.sqlQuery.getFieldMap())) {
				cachedSqlQuery.rerun = true
			}
		})
	}

	rerunQueries( //
	): void {
		// Add a bit of a wait to let any query-subscribed screens that are closing after
		// a mutation operation to un-subscribe from those queries.
		setTimeout(() => {
			this.queries.forEach((cachedSqlQuery) => {
				if (cachedSqlQuery.rerun) {
					cachedSqlQuery.rerun = false
					cachedSqlQuery.runQuery()
				}
			})
		}, 100)
	}
}

DI.set(ACTIVE_QUERIES, ActiveQueries)

export interface CachedSQLQuery {
	parameters: any[],
	portableQuery: PortableQuery,
	resultsSubject: Subject<any>,
	rerun: boolean;
	runQuery: Function,
	sqlQuery: SQLQuery<any>,
	sql: string
}
