import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	PortableQuery,
	Repository_GUID,
	Repository_LocalId,
	SyncAllModifiedColumnsMap
} from '@airport/ground-control'
import { IRepositoryDao } from '@airport/holding-pattern/dist/app/bundle'
import { CachedSQLQuery, IActiveQueries, IFieldMapped, ITerminalStore, SerializedJSONQuery } from '@airport/terminal-map'

@Injected()
export class ActiveQueries<SQLQuery extends IFieldMapped>
	implements IActiveQueries<SQLQuery> {

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	terminalStore: ITerminalStore

	get queries(): Map<SerializedJSONQuery, CachedSQLQuery<SQLQuery>> {
		return this.terminalStore.getQueries() as Map<SerializedJSONQuery, CachedSQLQuery<SQLQuery>>
	}

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

	async markQueriesToRerun(
		allModifiedColumnsMap: SyncAllModifiedColumnsMap,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
		context: IContext
	): Promise<void> {
		const repositoryLocalIdMapByGUIDs = this.terminalStore
			.getRepositoryLocalIdMapByGUIDs()
		const missingRepositoryGUIDSet = new Set<Repository_GUID>()
		for (const cachedSqlQuery of this.queries.values()) {
			for (const repositoryGUID of cachedSqlQuery.trackedRepoGUIDSet.values()) {
				if (!repositoryLocalIdMapByGUIDs.has(repositoryGUID)) {
					missingRepositoryGUIDSet.add(repositoryGUID)
				}
			}
		}
		if (missingRepositoryGUIDSet.size) {
			const repositories = await this.repositoryDao
				.findByGUIDs(Array.from(missingRepositoryGUIDSet), context)
			const repositoryGUIDMapByLocalIds = this.terminalStore
				.getRepositoryGUIDMapByLocalIds()
			for (const repository of repositories) {
				repositoryGUIDMapByLocalIds.set(repository._localId, repository.GUID)
				repositoryLocalIdMapByGUIDs.set(repository.GUID, repository._localId)
			}
		}

		for (const cachedSqlQuery of this.queries.values()) {
			cachedSqlQuery.rerun = this.shouldQueryBeRerun(
				cachedSqlQuery, allModifiedColumnsMap, trackedRepoLocalIdSet)
		}
	}

	private shouldQueryBeRerun(
		cachedSqlQuery: CachedSQLQuery<SQLQuery>,
		allModifiedColumnsMap: SyncAllModifiedColumnsMap,
		trackedRepoLocalIdSet: Set<Repository_LocalId>,
	): boolean {
		if (cachedSqlQuery.rerun) {
			// already marked to be re-run
			return true
		}

		if (!cachedSqlQuery.sqlQuery) {
			// Query hasn't been invoked yet, no need to re-run it
			return false
		}

		if (!allModifiedColumnsMap.intersects(cachedSqlQuery.sqlQuery.getAllModifiedColumnsMap())) {
			return false
		}

		if ((!cachedSqlQuery.trackedRepoGUIDSet.size
			&& !cachedSqlQuery.trackedRepoLocalIdSet.size)
			|| !trackedRepoLocalIdSet.size) {
			return true
		}

		const repositoryGUIDMapByLocalIds = this.terminalStore
			.getRepositoryGUIDMapByLocalIds()
		for (const repositoryLocalId of trackedRepoLocalIdSet.values()) {
			if (cachedSqlQuery.trackedRepoLocalIdSet.has(repositoryLocalId)) {
				return true
			}
			const repositoryGUID = repositoryGUIDMapByLocalIds.get(repositoryLocalId)
			if (cachedSqlQuery.trackedRepoGUIDSet.has(repositoryGUID)) {
				return true
			}

		}

		return false
	}

	rerunQueries(): void {
		// Add a bit of a wait to let any query-subscribed screens that are closing after
		// a mutation operation to un-subscribe from those queries.
		setTimeout(() => {
			for (const cachedSqlQuery of this.queries.values()) {
				if (cachedSqlQuery.rerun) {
					cachedSqlQuery.rerun = false
					cachedSqlQuery.runQuery()
				}
			}
		}, 100)
	}

	clearQueriesToRerun(): void {
		setTimeout(() => {
			for (const cachedSqlQuery of this.queries.values()) {
				cachedSqlQuery.rerun = false
			}
		}, 101)
	}

}
