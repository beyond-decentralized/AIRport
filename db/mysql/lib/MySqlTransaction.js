import { MySqlDriver } from './MySqlDriver';
export class MySqlTransaction extends MySqlDriver {
    constructor(driver, pool, connection) {
        super();
        this.driver = driver;
        this.connection = connection;
        this.pool = pool;
        this.queryApi = connection;
        this.__container__ = driver.__container__;
    }
    saveTransaction(transaction) {
        throw new Error('Method not implemented.');
    }
    async commit() {
        await this.connection.commit();
        this.pool.pool.releaseConnection(this.connection);
    }
    async rollback() {
        await this.connection.rollback();
        this.pool.pool.releaseConnection(this.connection);
    }
}
//# sourceMappingURL=MySqlTransaction.js.map