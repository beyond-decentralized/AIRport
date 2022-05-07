var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SQLDialect } from '@airport/fuel-hydrant-system';
import { QueryType, StoreType } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
import { SqlJsTransaction } from './SqlJsTransaction';
import { Injected } from '@airport/direction-indicator';
/**
 * Created by Papa on 11/27/2016.
 */
let SqlJsDriver = class SqlJsDriver extends SqLiteDriver {
    constructor() {
        super();
        this.type = StoreType.SQLJS;
    }
    async initialize() {
        const SQL = await initSqlJs({
            // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
            // You can omit locateFile completely when running in node
            locateFile: file => `./${file}`
        });
        this._db = new SQL.Database();
    }
    async setupTransaction(context, parentTransaction) {
        const transaction = new SqlJsTransaction(this, parentTransaction);
        await this.internalSetupTransaction(transaction, context);
        return transaction;
    }
    async internalStartTransaction(transaction, context) {
        const command = `SAVEPOINT '${transaction.id}'`;
        console.log(command);
        this._db.exec(command);
    }
    async internalCommit(transaction, context) {
        const command = `RELEASE SAVEPOINT '${transaction.id}'`;
        console.log(command);
        this._db.exec(command);
    }
    async internalRollback(transaction, context) {
        const command = `ROLLBACK TO SAVEPOINT '${transaction.id}'`;
        console.log(command);
        this._db.exec(command);
    }
    async query(queryType, query, params = [], context, saveTransaction = false) {
        while (!this._db) {
            await this.wait(50);
        }
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
                console.log(results);
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
    wait(milliseconds) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
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
    getDialect() {
        return SQLDialect.SQLITE;
    }
};
SqlJsDriver = __decorate([
    Injected()
], SqlJsDriver);
export { SqlJsDriver };
//# sourceMappingURL=SqlJsDriver.js.map