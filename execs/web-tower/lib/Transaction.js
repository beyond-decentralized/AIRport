export class Transaction {
    constructor(transactionManager) {
        this.transactionManager = transactionManager;
    }
    async commit() {
        await this.transactionManager.commit(this, {});
    }
    async rollback() {
        await this.transactionManager.rollback(this, {});
    }
    doesTableExist(applicationName, tableName, context) {
        throw new Error("Operation not supported from an application.");
    }
    dropTable(applicationName, tableName, context) {
        throw new Error("Operation not supported from an application.");
    }
    getEntityTableName(dbEntity, context) {
        throw new Error("Operation not supported from an application.");
    }
    getTableName(application, table, context) {
        throw new Error("Operation not supported from an application.");
    }
    initialize(dbName, context) {
        throw new Error("Operation not supported from an application.");
    }
    search(portableQuery, internalFragments, context, cachedSqlQueryId) {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    searchOne(portableQuery, internalFragments, context, cachedSqlQueryId) {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    transact(transactionalCallback, context) {
        throw new Error("Cannot nest transactional context from a transaction, please use 'transactional' method.  Note, nested transactions are not supported.");
    }
    startTransaction() {
        throw new Error("Operation not supported from an application, please use 'transactional' method.  Note, nested transactions are not supported.");
    }
    isServer(context) {
        throw new Error("Operation not supported from an application.");
    }
    deleteWhere(portableQuery, context) {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    find(portableQuery, internalFragments, context, cachedSqlQueryId) {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    findOne(portableQuery, internalFragments, ctx, cachedSqlQueryId) {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    findNative(sqlQuery, parameters, context) {
        throw new Error("Operation not supported from an application.");
    }
    insertValues(portableQuery, context, cachedSqlQueryId) {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    query(queryType, query, params, context, saveTransaction) {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    updateWhere(portableQuery, internalFragments, context) {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    isValueValid(value, sqlDataType, context) {
        throw new Error("Operation not supported from an application.");
    }
}
//# sourceMappingURL=Transaction.js.map