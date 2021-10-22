import { SQLDialect } from '@airport/fuel-hydrant-system';
import { StoreType, STORE_DRIVER } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
import { DI } from '@airport/di';
import { SqlJsTransaction } from './SqlJsTransaction';
/**
 * Created by Papa on 11/27/2016.
 */
export class SqlJsDriver extends SqLiteDriver {
    constructor() {
        super();
        this.type = StoreType.SQLJS;
    }
    async initialize() {
        const SQL = await initSqlJs({
            // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
            // You can omit locateFile completely when running in node
            locateFile: file => `https://sql.js.org/dist/${file}`
        });
        this._db = new SQL.Database();
    }
    async transact(transactionalCallback, context) {
        this._db.exec('BEGIN TRANSACTION;');
        await transactionalCallback(new SqlJsTransaction(this));
    }
    async commit() {
        this._db.exec('COMMIT;');
    }
    async rollback() {
        this._db.exec('ROLLBACK;');
    }
    async query(queryType, query, params = [], context, saveTransaction = false) {
        return new Promise((resolve, reject) => {
            let stmt;
            try {
                if (!['TQ_BOOLEAN_FIELD_CHANGE', 'TQ_DATE_FIELD_CHANGE', 'TQ_NUMBER_FIELD_CHANGE', 'TQ_STRING_FIELD_CHANGE',
                    'TQ_ENTITY_CHANGE', 'TQ_ENTITY_WHERE_CHANGE', 'TQ_TRANSACTION'].some((deltaTableName) => {
                    return query.indexOf(deltaTableName) > -1;
                })) {
                    console.log(query);
                    console.log(params);
                }
                stmt = this._db.prepare(query);
                stmt.bind(params);
                let results = [];
                while (stmt.step()) {
                    results.push(stmt.get());
                }
                resolve(results);
            }
            catch (error) {
                reject(error);
            }
            finally {
                if (stmt) {
                    stmt.free();
                }
            }
        });
    }
    handleError(error) {
        throw error;
    }
    getRows(result) {
        return result;
    }
    getDialect() {
        return SQLDialect.SQLITE;
    }
}
DI.set(STORE_DRIVER, SqlJsDriver);
//# sourceMappingURL=SqlJsDriver.js.map