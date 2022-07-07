var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from "@airport/direction-indicator";
import { Subject } from "rxjs";
let ObservableQueryAdapter = class ObservableQueryAdapter {
    wrapInObservable(portableQuery, queryCallback) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        let resultsSubject = new Subject();
        // FIXME: Remove the query for the list of cached queries, that are checked every
        //       time a mutation operation is run
        // let resultsSubject                 = new Subject<E>(() => {
        // 	if (resultsSubject.subscriptions.length < 1) {
        // 					// Remove the query for the list of cached queries, that are checked every
        // 					// time a mutation operation is run
        // 					this.activeQueries.remove(portableQuery)
        // 	}
        // });
        let cachedSqlQuery = {
            portableQuery,
            resultsSubject: resultsSubject,
            runQuery: () => {
                queryCallback().then(augmentedResult => {
                    resultsSubject.next(augmentedResult);
                });
            }
        };
        this.activeQueries.add(portableQuery, cachedSqlQuery);
        cachedSqlQuery.runQuery();
        return resultsSubject;
    }
};
__decorate([
    Inject()
], ObservableQueryAdapter.prototype, "activeQueries", void 0);
ObservableQueryAdapter = __decorate([
    Injected()
], ObservableQueryAdapter);
export { ObservableQueryAdapter };
//# sourceMappingURL=ObservableQueryAdapter.js.map