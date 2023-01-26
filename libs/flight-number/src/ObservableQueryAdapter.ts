import { Inject, Injected } from "@airport/direction-indicator";
import { PortableQuery } from "@airport/ground-control";
import { Observable, Subject } from "rxjs";
import { ActiveQueries, CachedSQLQuery, IFieldMapped } from "./ActiveQueries";

export interface IObservableQueryAdapter {

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
        let cachedSqlQuery: CachedSQLQuery<SQLQuery> = {
            portableQuery,
            resultsSubject: resultsSubject,
            runQuery: () => {
                queryCallback().then(augmentedResult => {
                    resultsSubject.next(augmentedResult)
                })
            }
        } as any as CachedSQLQuery<SQLQuery>;

        this.activeQueries.add(portableQuery, cachedSqlQuery);

        cachedSqlQuery.runQuery()

        return resultsSubject
    }

}
