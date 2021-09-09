import { WebSqlDriver } from './WebSqlDriver';
export class WebSqlTransaction extends WebSqlDriver {
    constructor(driver) {
        super();
        this.driver = driver;
        this.__container__ = driver.__container__;
    }
    saveTransaction(transaction) {
        throw new Error('Method not implemented.');
    }
    async commit() {
        this.driver.commit();
    }
    async rollback() {
        this.driver.rollback();
    }
}
//# sourceMappingURL=WebSqlTransaction.js.map