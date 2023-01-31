import {
	Injected
} from '@airport/direction-indicator'
import {
	ApplicationMap,
	PortableQuery,
	Repository_GUID,
	Repository_LocalId,
	SyncApplicationMap
} from '@airport/ground-control'
import { Subject } from 'rxjs'

export type SerializedJSONQuery = string

/**
 * Created by shamsutdinov.artem on 8/8/2016.
 */
export interface IActiveQueries<SQLQuery extends IFieldMapped> {

	queries: Map<SerializedJSONQuery, CachedSQLQuery<SQLQuery>>;

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

	rerunQueries(
		fieldMap: SyncApplicationMap
	): void;

	clearQueriesToRerun(): void

}

@Injected()
export class ActiveQueries<SQLQuery extends IFieldMapped>
	implements IActiveQueries<SQLQuery> {

	queries: Map<SerializedJSONQuery, CachedSQLQuery<SQLQuery>>
		= new Map<SerializedJSONQuery, CachedSQLQuery<SQLQuery>>()

	add(
		portableQuery: PortableQuery,
		cachedSqlQuery: CachedSQLQuery<SQLQuery>
	): void {
		const serializedJSONQuery = JSON.stringify(portableQuery.query)

		this.queries.set(serializedJSONQuery, cachedSqlQuery)
	}

	remove(
		portableQuery: PortableQuery
	): void {
		const serializedJSONQuery = JSON.stringify(portableQuery.query)

		this.queries.delete(serializedJSONQuery)
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

	rerunQueries(
		fieldMap: SyncApplicationMap
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
	trackedRepoLocalIdSet: Set<Repository_LocalId>,
}

export interface IFieldMapped {
	getFieldMap(): ApplicationMap
}
