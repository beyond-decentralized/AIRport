var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injected } from '@airport/direction-indicator';
let ActiveQueries = class ActiveQueries {
    constructor() {
        this.queries = new Map();
    }
    add(portableQuery, cachedSqlQuery) {
        this.queries.set(portableQuery, cachedSqlQuery);
    }
    remove(portableQuery) {
        this.queries.delete(portableQuery);
    }
    markQueriesToRerun(applicationMap) {
        this.queries.forEach((cachedSqlQuery) => {
            if (applicationMap.intersects(cachedSqlQuery.sqlQuery.getFieldMap())) {
                cachedSqlQuery.rerun = true;
            }
        });
    }
    rerunQueries( //
    ) {
        // Add a bit of a wait to let any query-subscribed screens that are closing after
        // a mutation operation to un-subscribe from those queries.
        setTimeout(() => {
            this.queries.forEach((cachedSqlQuery) => {
                if (cachedSqlQuery.rerun) {
                    cachedSqlQuery.rerun = false;
                    cachedSqlQuery.runQuery();
                }
            });
        }, 100);
    }
};
ActiveQueries = __decorate([
    Injected()
], ActiveQueries);
export { ActiveQueries };
//# sourceMappingURL=ActiveQueries.js.map