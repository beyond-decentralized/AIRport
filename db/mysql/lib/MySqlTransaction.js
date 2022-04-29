import { MySqlDriver } from './MySqlDriver';
export class MySqlTransaction extends MySqlDriver {
    constructor(driver, pool, connection) {
        super();
        this.driver = driver;
        this.connection = connection;
        this.isSync = false;
        this.pool = pool;
        this.queryApi = connection;
        this.__container__ = driver.__container__;
    }
    async saveTransaction(transaction) {
    }
    async commit() {
        await this.connection.commit();
        this.pool.pool.releaseConnection(this.connection.connection);
    }
    async rollback() {
        await this.connection.rollback();
        this.pool.pool.releaseConnection(this.connection.connection);
    }
}
//# sourceMappingURL=MySqlTransaction.js.map