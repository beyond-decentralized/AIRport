import { WebSqlDriver } from './WebSqlDriver';
export class WebSqlTransaction extends WebSqlDriver {
    constructor(driver) {
        super();
        this.driver = driver;
        this.__container__ = driver.__container__;
        this._db = driver._db;
    }
    async saveTransaction(transaction) {
    }
    async commit() {
        this.driver.commit();
    }
    async rollback() {
        this.driver.rollback();
    }
}
//# sourceMappingURL=WebSqlTransaction.js.map