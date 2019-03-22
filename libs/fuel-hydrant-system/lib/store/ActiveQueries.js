"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const InjectionTokens_1 = require("../InjectionTokens");
class ActiveQueries {
    constructor() {
        this.queries = new Map();
    }
    add(portableQuery, cachedSqlQuery) {
        this.queries.set(portableQuery, cachedSqlQuery);
    }
    remove(portableQuery) {
        this.queries.delete(portableQuery);
    }
    markQueriesToRerun(schemaMap) {
        this.queries.forEach((cachedSqlQuery) => {
            if (schemaMap.intersects(cachedSqlQuery.sqlQuery.getFieldMap())) {
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
}
exports.ActiveQueries = ActiveQueries;
di_1.DI.set(InjectionTokens_1.ACTIVE_QUERIES, ActiveQueries);
//# sourceMappingURL=ActiveQueries.js.map