import { INVALID_TABLE_NAME } from '@airport/ground-control';
import { WebSqlDriver } from './WebSqlDriver';
export class WebSqlTransaction extends WebSqlDriver {
    constructor(driver, nativeTransaction) {
        super();
        this.driver = driver;
        this.nativeTransaction = nativeTransaction;
        this.__container__ = driver.__container__;
        this._db = driver._db;
    }
    async saveTransaction(transaction) {
    }
    async query(queryType, query, params = [], context, saveTransaction = false) {
        return new Promise((resolve, reject) => {
            try {
                this.doQuery(queryType, query, params, context, this.nativeTransaction, resolve, reject);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    async commit() {
        // this.nativeTransaction.executeSql('COMMIT');
        // this.driver.commit();
    }
    async rollback() {
        this.nativeTransaction.executeSql('SELECT count(*) FROM ' + INVALID_TABLE_NAME, []);
        // this.driver.rollback();
    }
}
//# sourceMappingURL=WebSqlTransaction.js.map