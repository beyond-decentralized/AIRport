import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { StoreType } from '@airport/ground-control';
/**
 * Created by Papa on 8/30/2016.
 */
export class CockroachdbDriver extends SqlDriver {
    constructor() {
        super();
        this.type = StoreType.COCKROACHDB;
    }
    composeTableName(schemaName, tableName, context) {
        throw new Error('Not implemented');
    }
    async initialize(dbName, context) {
        throw new Error('Not implemented');
    }
    // TODO: refactor to work with callbacks
    async transact(callback, context) {
        throw new Error('Not implemented');
    }
    async query(queryType, query, params = [], context, saveTransaction = false) {
        throw new Error('Not implemented');
    }
    handleError(error) {
        throw error;
    }
    getDialect(context) {
        return SQLDialect.SQLITE_WEBSQL;
    }
}
//# sourceMappingURL=CockroachDbDriver.js.map