import { v4 as uuidv4 } from "uuid";
export class SqlJsTransaction {
    constructor(driver, parentTransaction) {
        this.driver = driver;
        this.parentTransaction = parentTransaction;
        this.isSync = false;
        this.__container__ = driver.__container__;
        this.id = uuidv4();
        this.type = driver.type;
        if (parentTransaction) {
            parentTransaction.childTransaction = this;
        }
    }
    async saveTransaction(transaction) {
    }
    async query(queryType, query, params = [], context, saveTransaction = false) {
        return this.driver.query(queryType, query, params, context, saveTransaction);
    }
    async doesTableExist(applicationName, tableName, context) {
        return await this.driver.doesTableExist(applicationName, tableName, context);
    }
    async dropTable(applicationName, tableName, context) {
        return await this.driver.dropTable(applicationName, tableName, context);
    }
    getEntityTableName(dbEntity, context) {
        return this.driver.getEntityTableName(dbEntity, context);
    }
    getTableName(application, table, context) {
        return this.driver.getTableName(application, table, context);
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
    async transact(transactionalCallback, context, parentTransaction) {
        await transactionalCallback(this);
    }
    async startTransaction(transaction) {
        throw new Error(`Nested transactions are not supported`);
    }
    async commit(transaction) {
        this.driver.commit(this);
    }
    async rollback(transaction) {
        this.driver.rollback(this);
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