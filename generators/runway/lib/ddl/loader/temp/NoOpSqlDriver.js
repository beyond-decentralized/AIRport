import { SqlDriver } from '@airport/fuel-hydrant-system';
export class NoOpSqlDriver extends SqlDriver {
    composeTableName(applicationName, tableName, context) {
        return '';
    }
    doesTableExist(applicationName, tableName, context) {
        return Promise.resolve(false);
    }
    dropTable(applicationName, tableName, context) {
        return Promise.resolve(false);
    }
    findNative(sqlQuery, parameters, context) {
        return Promise.resolve([]);
    }
    initialize(dbName, context) {
        return Promise.resolve(undefined);
    }
    isServer(context) {
        return false;
    }
    isValueValid(value, sqlDataType, context) {
        return false;
    }
    query(queryType, query, params, context, saveTransaction) {
        return Promise.resolve(undefined);
    }
    async startTransaction(transaction, context) {
        return Promise.resolve(undefined);
    }
    async internalCommit(transaction, context) {
        return Promise.resolve(undefined);
    }
    async internalRollback(transaction, context) {
        return Promise.resolve(undefined);
    }
    async internalStartTransaction(transaction, context) {
        return Promise.resolve(undefined);
    }
    async setupTransaction(context, parentTransaction) {
        return Promise.resolve(undefined);
    }
    getSelectQuerySuffix(jsonQuery, context) {
        return '';
    }
    executeNative(sql, parameters, context) {
        return Promise.resolve(0);
    }
    getDialect(context) {
        return undefined;
    }
}
//# sourceMappingURL=NoOpSqlDriver.js.map