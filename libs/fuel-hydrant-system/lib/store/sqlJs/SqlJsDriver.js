import { QueryType, StoreType } from '@airport/ground-control';
// FIXME: add support, in future, if needed
// import {Database}      from 'sql.js'
import { SQLDialect } from '../../sql/core/SQLQuery';
import { SqLiteDriver } from '../sqLite/SqLiteDriver';
export class SqlJsDriver extends SqLiteDriver {
    constructor() {
        super();
        this.type = StoreType.SQLJS;
    }
    getDialect() {
        return SQLDialect.SQLITE_SQLJS;
    }
    async initialize() {
        if (typeof SQL !== 'undefined') {
            this._db = new SQL.Database();
        }
        else {
            // FIXME: add support, in future, if needed
            // let sql  = require('sql.js')
            // this._db = new sql.Database()
            throw new Error('Not implemented');
        }
    }
    async transact() {
        this._db.exec('BEGIN TRANSACTION;');
        this.currentTransaction = true;
    }
    async commit() {
        try {
            this._db.exec('COMMIT;');
        }
        finally {
            this.currentTransaction = false;
        }
    }
    async rollback() {
        try {
            this._db.exec('ROLLBACK;');
        }
        finally {
            this.currentTransaction = false;
        }
    }
    async query(queryType, query, params = [], saveTransaction = false) {
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
    getReturnValue(queryType, response) {
        switch (queryType) {
            case QueryType.MUTATE:
                return response.rowsAffected;
            case QueryType.SELECT:
                return response.rows;
            default:
                return null;
        }
    }
    handleError(error) {
        throw error;
    }
}
//# sourceMappingURL=SqlJsDriver.js.map