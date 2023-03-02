import { IContext } from "@airport/direction-indicator";
import { AllModifiedColumnsMap, PortableQuery, Repository_GUID, Repository_LocalId, SyncAllModifiedColumnsMap } from "@airport/ground-control";
import { Subject } from "rxjs";

export type SerializedJSONQuery = string

/**
 * Created by shamsutdinov.artem on 8/8/2016.
 */
export interface IActiveQueries<SQLQuery extends IFieldMapped> {

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
	 * @param allModifiedColumnsMap   Map of Tables and Columns in the change being checked
	 * @param trackedRepoLocalIdSet Set _localId(s) for the modified Repositories
	 * 
	 */
	markQueriesToRerun(
		allModifiedColumnsMap: SyncAllModifiedColumnsMap,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		context: IContext
	): Promise<void>;

	rerunQueries(): void;

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
	getAllModifiedColumnsMap(): AllModifiedColumnsMap
}
