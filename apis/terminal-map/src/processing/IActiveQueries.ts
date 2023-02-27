import { ApplicationMap, PortableQuery, Repository_GUID, Repository_LocalId, SyncApplicationMap } from "@airport/ground-control";
import { Subject } from "rxjs";

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
