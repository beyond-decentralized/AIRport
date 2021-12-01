export class SqlJsTransaction {
    constructor(driver) {
        this.driver = driver;
        this.isSync = false;
        this.__container__ = driver.__container__;
        this.type = driver.type;
    }
    async commit() {
        this.driver.commit();
    }
    async rollback() {
        this.driver.rollback();
    }
    async saveTransaction(transaction) {
    }
    async query(queryType, query, params = [], context, saveTransaction = false) {
        return this.driver.query(queryType, query, params, context, saveTransaction);
    }
    async doesTableExist(schemaName, tableName, context) {
        return await this.driver.doesTableExist(schemaName, tableName, context);
    }
    async dropTable(schemaName, tableName, context) {
        return await this.driver.dropTable(schemaName, tableName, context);
    }
    getEntityTableName(dbEntity, context) {
        return this.driver.getEntityTableName(dbEntity, context);
    }
    getTableName(schema, table, context) {
        return this.driver.getTableName(schema, table, context);
    }
    async initialize(dbName, context) {
        // Nothing to do
    }
    search(portableQuery, internalFragments, context, cachedSqlQueryId) {
        return this.driver.search(portableQuery, internalFragments, context, cachedSqlQueryId);
    }
    searchOne(portableQuery, internalFragments, context, cachedSqlQueryId) {
        return this.driver.searchOne(portableQuery, internalFragments, context, cachedSqlQueryId);
    }
    async transact(transactionalCallback, context) {
        await transactionalCallback(this);
    }
    isServer(context) {
        return false;
    }
    async deleteWhere(portableQuery, context) {
        return await this.driver.deleteWhere(portableQuery, context);
    }
    async find(portableQuery, internalFragments, context, cachedSqlQueryId) {
        return await this.driver.find(portableQuery, internalFragments, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, internalFragments, context, cachedSqlQueryId) {
        return await this.driver.findOne(portableQuery, internalFragments, context, cachedSqlQueryId);
    }
    async findNative(sqlQuery, parameters, context) {
        return await this.driver.findNative(sqlQuery, parameters, context);
    }
    async insertValues(portableQuery, context, cachedSqlQueryId) {
        return await this.driver.insertValues(portableQuery, context, cachedSqlQueryId);
    }
    async updateWhere(portableQuery, internalFragments, context) {
        return await this.driver.updateWhere(portableQuery, internalFragments, context);
    }
    isValueValid(value, sqlDataType, context) {
        return this.driver.isValueValid(value, sqlDataType, context);
    }
}
//# sourceMappingURL=SqlJsTransaction.js.map