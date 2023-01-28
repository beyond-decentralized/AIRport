import { IRepositoryLoader } from "@airport/air-traffic-control";
import { Inject, Injected } from "@airport/direction-indicator";
import { PortableQuery, Repository_GUID } from "@airport/ground-control";
import { IRepositoryDao } from '@airport/holding-pattern/dist/app/bundle'
import { Observable, Subject } from "rxjs";
import { ActiveQueries, CachedSQLQuery, IFieldMapped } from "./ActiveQueries";

export interface IObservableQueryAdapter {

    checkRepositoryExistence(): Promise<void>

    wrapInObservable<E>(
        portableQuery: PortableQuery,
        queryCallback: {
            (): Promise<any>
        }
    ): Observable<E>

    trackedRepoGUIDArrayToSet(
        trackedRepoGUIDs: Repository_GUID[]
    ): Set<Repository_GUID>

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

    repositoryGUIDSetToCheck: Set<Repository_GUID> = new Set()

    repositoryExistenceCheckInProgress = false

    async checkRepositoryExistence(): Promise<void> {
        try {
            if (this.repositoryExistenceCheckInProgress) {
                return
            }
            this.repositoryExistenceCheckInProgress = true

            const locallyPresentRepositories = await this.repositoryDao
                .findByGUIDs(Array.from(this.repositoryGUIDSetToCheck))
            const locallyPresentRepositoryGUIDSet: Set<Repository_GUID> = new Set()
            for (const localyPresentRepository of locallyPresentRepositories) {
                locallyPresentRepositoryGUIDSet.add(localyPresentRepository.GUID)
            }

            const locallyMissingRepositoryGUIDS: Repository_GUID[] = []
            for (const repositoryGUIDToCheck of this.repositoryGUIDSetToCheck.values()) {
                if (!locallyPresentRepositoryGUIDSet.has(repositoryGUIDToCheck)) {
                    locallyMissingRepositoryGUIDS.push(repositoryGUIDToCheck)
                }
            }


            for (const locallyMissingRepositoryGUID of locallyMissingRepositoryGUIDS) {
                await this.repositoryLoader.loadRepository(
                    locallyMissingRepositoryGUID,
                    {
                        doNotLoadReferences: true
                    }
                )
            }

            this.repositoryGUIDSetToCheck.clear()
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
        let cachedSqlQuery: CachedSQLQuery<SQLQuery> = {
            portableQuery,
            resultsSubject: resultsSubject,
            runQuery: () => {
                queryCallback().then(augmentedResult => {
                    resultsSubject.next(augmentedResult)
                })
            },
            trackedRepoGUIDSet
        } as any as CachedSQLQuery<SQLQuery>;

        this.activeQueries.add(portableQuery, cachedSqlQuery);

        cachedSqlQuery.runQuery()

        return resultsSubject
    }

    trackedRepoGUIDArrayToSet(
        trackedRepoGUIDs: Repository_GUID[]
    ): Set<Repository_GUID> {
        let trackedRepoGUIDSet: Set<Repository_GUID> = new Set()
        if (trackedRepoGUIDs instanceof Array && trackedRepoGUIDs.length) {
            for (const trackedRepoGUID of trackedRepoGUIDs) {
                if (typeof trackedRepoGUID !== 'string') {
                    throw new Error(`Invalid Repository GUID`)
                }
                trackedRepoGUIDSet.add(trackedRepoGUID)
                this.repositoryGUIDSetToCheck.add(trackedRepoGUID)
            }
        }

        return trackedRepoGUIDSet
    }

}
