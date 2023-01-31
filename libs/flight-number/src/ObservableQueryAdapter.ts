import { IRepositoryLoader } from "@airport/air-traffic-control";
import { Inject, Injected } from "@airport/direction-indicator";
import { IRepository, PortableQuery, Repository_GUID, Repository_LocalId, SyncApplicationMap } from "@airport/ground-control";
import { IRepositoryDao } from '@airport/holding-pattern/dist/app/bundle'
import { ITransaction } from "@airport/terminal-map";
import { Observable, Subject } from "rxjs";
import { ActiveQueries, CachedSQLQuery, IFieldMapped } from "./ActiveQueries";

export interface IObservableQueryAdapter {

    checkExistenceOfQueriedRepositories(): Promise<void>

    collectAffectedFieldsAndRepositoriesToRerunQueriesBy(
        portableQuery: PortableQuery,
        fieldMap: SyncApplicationMap,
        transaction: ITransaction
    ): void

    wrapInObservable<E>(
        portableQuery: PortableQuery,
        queryCallback: {
            (): Promise<any>
        }
    ): Observable<E>

}

@Injected()
export class ObservableQueryAdapter<SQLQuery extends IFieldMapped>
    implements IObservableQueryAdapter {

    @Inject()
    activeQueries: ActiveQueries<SQLQuery>

    @Inject()
    repositoryDao: IRepositoryDao

    @Inject()
    repositoryLoader: IRepositoryLoader

    queriedRepositoryIds: {
        GUIDSet: Set<Repository_GUID>,
        localIdSet: Set<Repository_LocalId>
    } = {
            GUIDSet: new Set(),
            localIdSet: new Set()
        }

    repositoryExistenceCheckInProgress = false

    collectAffectedFieldsAndRepositoriesToRerunQueriesBy(
        portableQuery: PortableQuery,
        fieldMap: SyncApplicationMap,
        transaction: ITransaction
    ): void {
        transaction.fieldMap.merge(fieldMap)

        const trackedRepoGUIDs = portableQuery.trackedRepoGUIDs
        if (trackedRepoGUIDs instanceof Array) {
            for (const trackedRepoGUID of trackedRepoGUIDs) {
                if (typeof trackedRepoGUID !== 'string') {
                    throw new Error(`Invalid Repository GUID`)
                }
                transaction.affectedRepository_GUIDSet.add(trackedRepoGUID)
            }
        }

        const trackedRepoLocalIds = portableQuery.trackedRepoLocalIds
        if (trackedRepoLocalIds instanceof Array) {
            for (const trackedRepoLocalId of trackedRepoLocalIds) {
                if (typeof trackedRepoLocalId !== 'number') {
                    throw new Error(`Invalid Repository LocalId`)
                }
                transaction.affectedRepository_LocalIdSet.add(trackedRepoLocalId)
            }
        }
    }

    async checkExistenceOfQueriedRepositories(): Promise<void> {
        try {
            if (this.repositoryExistenceCheckInProgress) {
                return
            }
            this.repositoryExistenceCheckInProgress = true

            const locallyPresentRepositories = await this.repositoryDao
                .findByGUIDsAndLocalIds(
                    Array.from(this.queriedRepositoryIds.GUIDSet),
                    Array.from(this.queriedRepositoryIds.localIdSet)
                )
            const locallyPresentRepositoryMapByGUID:
                Map<Repository_GUID, IRepository> = new Map()
            const locallyPresentRepositoryMapByLocalId:
                Map<Repository_LocalId, IRepository> = new Map()
            for (const localyPresentRepository of locallyPresentRepositories) {
                locallyPresentRepositoryMapByGUID.set(
                    localyPresentRepository.GUID,
                    localyPresentRepository
                )
                locallyPresentRepositoryMapByLocalId.set(
                    localyPresentRepository._localId,
                    localyPresentRepository
                )
            }

            const locallyMissingRepositoryGUIDSet: Set<Repository_GUID> = new Set()
            for (const repositoryGUIDToCheck of this.queriedRepositoryIds.GUIDSet.values()) {
                const locallyPresentRepository = locallyPresentRepositoryMapByGUID
                    .get(repositoryGUIDToCheck)
                if (!locallyPresentRepository || !locallyPresentRepository.isLoaded) {
                    locallyMissingRepositoryGUIDSet.add(repositoryGUIDToCheck)
                }
            }
            for (const repositoryLocalId of this.queriedRepositoryIds.localIdSet.values()) {
                const locallyPresentRepository = locallyPresentRepositoryMapByLocalId
                    .get(repositoryLocalId)
                if (!locallyPresentRepository) {
                    throw new Error(`Did not find a repository with _localId '${repositoryLocalId}'.`)
                }
                if (!locallyPresentRepository.isLoaded) {
                    locallyMissingRepositoryGUIDSet.add(locallyPresentRepository.GUID)
                }
            }

            for (const locallyMissingRepositoryGUID of locallyMissingRepositoryGUIDSet.values()) {
                await this.repositoryLoader.loadRepository(
                    locallyMissingRepositoryGUID,
                    {
                        doNotLoadReferences: true
                    }
                )
            }

            this.queriedRepositoryIds.GUIDSet.clear()
            this.queriedRepositoryIds.localIdSet.clear()
        } catch (e) {
            console.error('Error checking Repositor existence')
            console.error(e)
        } finally {
            this.repositoryExistenceCheckInProgress = false
        }
    }

    wrapInObservable<E>(
        portableQuery: PortableQuery,
        queryCallback: {
            (): Promise<any>
        }
    ): Observable<E> {
        // TODO: checking for presence of a Repository in an Observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)

        let resultsSubject = new Subject<E>()
        // FIXME: Remove the query for the list of cached queries, that are checked every
        //       time a mutation operation is run
        // let resultsSubject                 = new Subject<E>(() => {
        // 	if (resultsSubject.subscriptions.length < 1) {
        // 					// Remove the query for the list of cached queries, that are checked every
        // 					// time a mutation operation is run
        // 					this.activeQueries.remove(portableQuery)
        // 	}
        // });
        let trackedRepoGUIDSet: Set<Repository_GUID> = this
            .trackedRepoGUIDArrayToSet(portableQuery.trackedRepoGUIDs)
        let trackedRepoLocalIdSet: Set<Repository_LocalId> = this
            .trackedRepoLocalIdArrayToSet(portableQuery.trackedRepoLocalIds)

        let cachedSqlQuery: CachedSQLQuery<SQLQuery> = {
            portableQuery,
            resultsSubject,
            runQuery: () => {
                queryCallback().then(augmentedResult => {
                    resultsSubject.next(augmentedResult)
                })
            },
            trackedRepoGUIDSet,
            trackedRepoLocalIdSet
        } as any as CachedSQLQuery<SQLQuery>;

        this.activeQueries.add(portableQuery, cachedSqlQuery);

        cachedSqlQuery.runQuery()

        return resultsSubject
    }

    private trackedRepoGUIDArrayToSet(
        trackedRepoGUIDs: Repository_GUID[]
    ): Set<Repository_GUID> {
        let trackedRepoGUIDSet: Set<Repository_GUID> = new Set()
        if (!(trackedRepoGUIDs instanceof Array) || !trackedRepoGUIDs.length) {
            return
        }

        for (const trackedRepoGUID of trackedRepoGUIDs) {
            if (typeof trackedRepoGUID !== 'string') {
                throw new Error(`Invalid Repository GUID`)
            }
            trackedRepoGUIDSet.add(trackedRepoGUID)
        }

        return trackedRepoGUIDSet
    }

    private trackedRepoLocalIdArrayToSet(
        trackedRepoLocalIds: Repository_LocalId[]
    ): Set<Repository_LocalId> {
        let trackedRepoLocalIdSet: Set<Repository_LocalId> = new Set()
        if (!(trackedRepoLocalIds instanceof Array) || !trackedRepoLocalIds.length) {
            return
        }

        for (const trackedRepoLocalId of trackedRepoLocalIds) {
            if (typeof trackedRepoLocalId !== 'number') {
                throw new Error(`Invalid Repository Local Id`)
            }
            trackedRepoLocalIdSet.add(trackedRepoLocalId)
        }

        return trackedRepoLocalIdSet
    }

}
