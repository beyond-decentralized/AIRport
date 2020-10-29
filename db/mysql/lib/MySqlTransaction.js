export class MySqlTransaction {
    constructor(driver, pool, connection) {
        this.driver = driver;
        this.pool = pool;
        this.connection = connection;
    }
    deleteWhere(portableQuery) {
        throw new Error('Method not implemented.');
    }
    find(portableQuery, internalFragments, cachedSqlQueryId) {
        throw new Error('Method not implemented.');
    }
    findOne(portableQuery, internalFragments, cachedSqlQueryId) {
        throw new Error('Method not implemented.');
    }
    findNative(sqlQuery, parameters) {
        throw new Error('Method not implemented.');
    }
    insertValues(portableQuery, cachedSqlQueryId) {
        throw new Error('Method not implemented.');
    }
    query(queryType, query, params, saveTransaction) {
        throw new Error('Method not implemented.');
    }
    saveTransaction(transaction) {
        throw new Error('Method not implemented.');
    }
    updateWhere(portableQuery, internalFragments) {
        throw new Error('Method not implemented.');
    }
    async commit() {
        await this.connection.commit();
        this.pool.releaseConnection(this.connection);
    }
    async rollback() {
        await this.connection.rollback();
        this.pool.releaseConnection(this.connection);
    }
    isValueValid(value, sqlDataType) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=MySqlTransaction.js.map