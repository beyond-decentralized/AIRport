import { DI } from '@airport/di';
import { ACTIVE_QUERIES } from '../tokens';
export class ActiveQueries {
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
DI.set(ACTIVE_QUERIES, ActiveQueries);
//# sourceMappingURL=ActiveQueries.js.map