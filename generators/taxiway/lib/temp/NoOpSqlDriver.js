import { SqlDriver } from '@airport/fuel-hydrant-system';
export class NoOpSqlDriver extends SqlDriver {
    composeTableName(schemaName, tableName, context) {
        return '';
    }
    doesTableExist(schemaName, tableName, context) {
        return Promise.resolve(false);
    }
    dropTable(schemaName, tableName, context) {
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
    transact(callback, context) {
        return Promise.resolve(undefined);
    }
    executeNative(sql, parameters, context) {
        return Promise.resolve(0);
    }
    getDialect(context) {
        return undefined;
    }
}
//# sourceMappingURL=NoOpSqlDriver.js.map