import { PostgreSqlDriver } from './PostgreSqlDriver';
export class PostgreTransaction extends PostgreSqlDriver {
    constructor(driver, pool, client) {
        super();
        this.driver = driver;
        this.client = client;
        this.pool = pool;
        this.__container__ = driver.__container__;
    }
    async saveTransaction(transaction) {
    }
    async commit() {
        try {
            await this.client.query('COMMIT');
        }
        finally {
            this.client.release();
        }
    }
    async rollback() {
        try {
            await this.client.query('ROLLBACK');
        }
        finally {
            this.client.release();
        }
    }
    async getClient() {
        return await this.client;
    }
}
//# sourceMappingURL=PostgreTransaction.js.map