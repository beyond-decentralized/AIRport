import { IRepositoryLoader } from "@airport/air-traffic-control"
import { IContext, Inject, Injected } from "@airport/direction-indicator"
import { IRepository, PortableQuery, Repository_GUID, Repository_LocalId } from "@airport/ground-control"
import { IRepositoryDao } from '@airport/holding-pattern/dist/app/bundle'
import { CachedSQLQuery, IFieldMapped, IQueryOperationContext, ITransactionManager } from "@airport/terminal-map"
import { Observable, Subject } from "rxjs"
import { ActiveQueries } from "./ActiveQueries"

export interface IObservableQueryAdapter {

    checkExistenceOfQueriedRepositories(): Promise<void>

    wrapInObservable<E>(
        portableQuery: PortableQuery,
        queryCallback: {
            (
                context: IQueryOperationContext
            ): Promise<any>
        },
        context: IQueryOperationContext
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

    @Inject()
    transactionManager: ITransactionManager

    queriedRepositoryIds: {
        GUIDSet: Set<Repository_GUID>,
        localIdSet: Set<Repository_LocalId>
    } = {
            GUIDSet: new Set(),
            localIdSet: new Set()
        }

    repositoryExistenceCheckInProgress = false

    async checkExistenceOfQueriedRepositories(): Promise<void> {
        try {
            if (!this.queriedRepositoryIds.GUIDSet.size && !this.queriedRepositoryIds.localIdSet.size) {
                return
            }
            if (this.repositoryExistenceCheckInProgress) {
                return
            }
            this.repositoryExistenceCheckInProgress = true

            await this.transactionManager.transactInternal(async (
                _transaction,
                context
            ) => {
                await this.doCheckExistenceOfQueriedRepositories(
                    context
                )
            }, null, {})
        } catch (e) {
            console.error('Error checking Repositor existence')
            console.error(e)
        } finally {
            this.repositoryExistenceCheckInProgress = false
        }
    }

    private async doCheckExistenceOfQueriedRepositories(
        context: IContext
    ): Promise<void> {
        const locallyPresentRepositories = await this.repositoryDao
            .findByGUIDsAndLocalIds(
                Array.from(this.queriedRepositoryIds.GUIDSet),
                Array.from(this.queriedRepositoryIds.localIdSet),
                context
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

        this.queriedRepositoryIds.GUIDSet.clear()
        this.queriedRepositoryIds.localIdSet.clear()

        for (const locallyMissingRepositoryGUID of locallyMissingRepositoryGUIDSet.values()) {
            try {
                await this.repositoryLoader.loadRepository(
                    locallyMissingRepositoryGUID,
                    {
                        ...context,
                        doNotLoadReferences: true,
                        isNestedLoadCall: false
                    }
                )
            } catch (e) {
                console.error(`Error loading repository: ${locallyMissingRepositoryGUID}`)
                console.error(e)
            }
        }
    }

    wrapInObservable<E>(
        portableQuery: PortableQuery,
        queryCallback: {
            (
                context: IQueryOperationContext
            ): Promise<any>
        },
        context: IQueryOperationContext
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
                let queryContext: IQueryOperationContext = {
                    ...context,
                    cachedSqlQuery,
                    isObservableApiCall: true
                }
                queryCallback(queryContext).then(augmentedResult => {
                    resultsSubject.next(augmentedResult)
                }).catch(e => {
                    resultsSubject.error(e)
                })
            },
            trackedRepoGUIDSet,
            trackedRepoLocalIdSet
        } as any as CachedSQLQuery<SQLQuery>

        this.activeQueries.add(portableQuery, cachedSqlQuery)

        cachedSqlQuery.runQuery()

        return resultsSubject
    }

    private trackedRepoGUIDArrayToSet(
        trackedRepoGUIDs: Repository_GUID[]
    ): Set<Repository_GUID> {
        let trackedRepoGUIDSet: Set<Repository_GUID> = new Set()
        if (!(trackedRepoGUIDs instanceof Array) || !trackedRepoGUIDs.length) {
            return trackedRepoGUIDSet
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
            return trackedRepoLocalIdSet
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
