import {
	Injected
} from '@airport/direction-indicator'
import {
	ApplicationMap,
	PortableQuery,
	SyncApplicationMap
} from '@airport/ground-control'
import { Subject } from 'rxjs'

/**
 * Created by shamsutdinov.artem on 8/8/2016.
 */
export interface IActiveQueries<SQLQuery extends IFieldMapped> {

	queries: Map<PortableQuery, CachedSQLQuery<SQLQuery>>;

	add(
		portableQuery: PortableQuery,
		cachedSqlQuery: CachedSQLQuery<SQLQuery>
	): void;

	remove(
		portableQuery: PortableQuery
	): void;

	markQueriesToRerun(
		applicationMap: SyncApplicationMap
	): void;

	rerunQueries( //
	): void;

}

@Injected()
export class ActiveQueries<SQLQuery extends IFieldMapped>
	implements IActiveQueries<SQLQuery> {

	queries: Map<PortableQuery, CachedSQLQuery<SQLQuery>> = new Map<PortableQuery, CachedSQLQuery<SQLQuery>>()

	add(
		portableQuery: PortableQuery,
		cachedSqlQuery: CachedSQLQuery<SQLQuery>
	): void {
		this.queries.set(portableQuery, cachedSqlQuery)
	}

	remove(
		portableQuery: PortableQuery
	): void {
		this.queries.delete(portableQuery)
	}

	markQueriesToRerun(
		applicationMap: SyncApplicationMap
	): void {
		this.queries.forEach((cachedSqlQuery) => {
			if (applicationMap.intersects(cachedSqlQuery.sqlQuery.getFieldMap())) {
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

export interface CachedSQLQuery<SQLQuery extends IFieldMapped> {
	parameters: any[],
	portableQuery: PortableQuery,
	resultsSubject: Subject<any>,
	rerun: boolean;
	runQuery: Function,
	sqlQuery: SQLQuery,
	sql: string
}

export interface IFieldMapped {
	getFieldMap(): ApplicationMap
}
