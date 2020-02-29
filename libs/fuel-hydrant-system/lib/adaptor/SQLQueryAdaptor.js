import { SQLDialect } from '../sql/core/SQLQuery';
export function getSQLAdaptor(sqlValueProvider, sqlDialect) {
    switch (sqlDialect) {
        case SQLDialect.ORACLE:
            let OracleQueryAdaptorClass = require('./OracleQueryAdaptor').OracleQueryAdaptor;
            return new OracleQueryAdaptorClass(sqlValueProvider);
        case SQLDialect.SQLITE_SQLJS:
            let SqlJsQueryAdaptorClass = require('./SqlJsQueryAdaptor').SqlJsQueryAdaptor;
            return new SqlJsQueryAdaptorClass(sqlValueProvider);
        case SQLDialect.SQLITE_WEBSQL:
            let WebSqlQueryAdaptorClass = require('./WebSqlQueryAdaptor').WebSqlQueryAdaptor;
            return new WebSqlQueryAdaptorClass(sqlValueProvider);
        default:
            throw new Error(`Unknown SQL Dialect ${sqlDialect}`);
    }
}
export class AbstractFunctionAdaptor {
    constructor(sqlValueProvider) {
        this.sqlValueProvider = sqlValueProvider;
    }
    getFunctionCalls(clause, innerValue, qEntityMapByAlias, airDb, schemaUtils, metadataUtils) {
        clause.af.forEach((appliedFunction) => {
            innerValue = this.getFunctionCall(appliedFunction, innerValue, qEntityMapByAlias, airDb, schemaUtils, metadataUtils);
        });
        return innerValue;
    }
}
//# sourceMappingURL=SQLQueryAdaptor.js.map