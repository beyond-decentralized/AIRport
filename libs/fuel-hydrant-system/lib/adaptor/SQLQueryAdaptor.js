"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SQLQuery_1 = require("../sql/core/SQLQuery");
function getSQLAdaptor(sqlValueProvider, sqlDialect) {
    switch (sqlDialect) {
        case SQLQuery_1.SQLDialect.ORACLE:
            let OracleQueryAdaptorClass = require("./OracleQueryAdaptor").OracleQueryAdaptor;
            return new OracleQueryAdaptorClass(sqlValueProvider);
        case SQLQuery_1.SQLDialect.SQLITE_SQLJS:
            let SqlJsQueryAdaptorClass = require("./SqlJsQueryAdaptor").SqlJsQueryAdaptor;
            return new SqlJsQueryAdaptorClass(sqlValueProvider);
        case SQLQuery_1.SQLDialect.SQLITE_WEBSQL:
            let WebSqlQueryAdaptorClass = require("./WebSqlQueryAdaptor").WebSqlQueryAdaptor;
            return new WebSqlQueryAdaptorClass(sqlValueProvider);
        default:
            throw `Unknown SQL Dialect ${sqlDialect}`;
    }
}
exports.getSQLAdaptor = getSQLAdaptor;
class AbstractFunctionAdaptor {
    constructor(sqlValueProvider) {
        this.sqlValueProvider = sqlValueProvider;
    }
    getFunctionCalls(clause, innerValue, qEntityMapByAlias) {
        clause.af.forEach((appliedFunction) => {
            innerValue = this.getFunctionCall(appliedFunction, innerValue, qEntityMapByAlias);
        });
        return innerValue;
    }
}
exports.AbstractFunctionAdaptor = AbstractFunctionAdaptor;
//# sourceMappingURL=SQLQueryAdaptor.js.map