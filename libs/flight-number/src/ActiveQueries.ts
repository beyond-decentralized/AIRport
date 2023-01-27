import {
	Injected
} from '@airport/direction-indicator'
import {
	ApplicationMap,
	PortableQuery,
	Repository_GUID,
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

	/**
	 * Rerunning queries based on intersecting tables and columns.
	 * Using repository ids in either query parameters or query results
	 * could exlude some queries that really should be re-run.
	 * 
	 * @param applicationMap   Map of Tables and Columns in the change being checked
	 * 
	 */
	markQueriesToRerun(
		applicationMap: SyncApplicationMap,
		trackedRepoGUIDSet: Set<Repository_GUID>
	): void;

	rerunQueries(): void;

	clearQueriesToRerun(): void

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
		applicationMap: SyncApplicationMap,
		trackedRepoGUIDSet: Set<Repository_GUID>
	): void {
		this.queries.forEach((cachedSqlQuery) => {
			cachedSqlQuery.rerun = this.shouldQueryBeRerun(
				cachedSqlQuery, applicationMap, trackedRepoGUIDSet)
		})
	}

	private shouldQueryBeRerun(
		cachedSqlQuery: CachedSQLQuery<SQLQuery>,
		applicationMap: SyncApplicationMap,
		trackedRepoGUIDSet: Set<Repository_GUID>,
	): boolean {
		if (cachedSqlQuery.rerun) {
			// already marked to be re-run
			return true
		}

		if (!applicationMap.intersects(cachedSqlQuery.sqlQuery.getFieldMap())) {
			return false
		}

		if (!cachedSqlQuery.trackedRepoGUIDSet.size || !trackedRepoGUIDSet.size) {
			return true
		}

		for (const repositoryGUID of trackedRepoGUIDSet.values()) {
			if (cachedSqlQuery.trackedRepoGUIDSet.has(repositoryGUID)) {
				return true
			}
		}

		return false
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

	clearQueriesToRerun(): void {
		this.queries.forEach((cachedSqlQuery) => {
			cachedSqlQuery.rerun = false
		})
	}

}

export interface CachedSQLQuery<SQLQuery extends IFieldMapped> {
	parameters: any[],
	portableQuery: PortableQuery,
	resultsSubject: Subject<any>,
	rerun: boolean;
	runQuery: Function,
	sqlQuery: SQLQuery,
	sql: string,
	trackedRepoGUIDSet: Set<Repository_GUID>,
}

export interface IFieldMapped {
	getFieldMap(): ApplicationMap
}
