"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const tokens_1 = require("../../tokens");
const OperableField_1 = require("../core/field/OperableField");
const WrapperFunctions_1 = require("../core/field/WrapperFunctions");
class QueryUtils {
    whereClauseToJSON(whereClause, columnAliases, fieldUtils) {
        if (!whereClause) {
            return null;
        }
        let operation = whereClause;
        let jsonOperation = {
            c: operation.c,
            o: operation.o
        };
        switch (operation.c) {
            case ground_control_1.OperationCategory.LOGICAL:
                let logicalOperation = operation;
                let jsonLogicalOperation = jsonOperation;
                switch (operation.o) {
                    case ground_control_1.SqlOperator.NOT:
                        jsonLogicalOperation.v = this.whereClauseToJSON(logicalOperation.v, columnAliases, fieldUtils);
                        break;
                    case ground_control_1.SqlOperator.AND:
                    case ground_control_1.SqlOperator.OR:
                        jsonLogicalOperation.v = logicalOperation.v.map((value) => this.whereClauseToJSON(value, columnAliases, fieldUtils));
                        break;
                    default:
                        throw new Error(`Unsupported logical operation '${operation.o}'`);
                }
                break;
            case ground_control_1.OperationCategory.FUNCTION:
                // TODO: verify that cast of Q object is valid
                let functionOperation = operation;
                let query = functionOperation.getQuery();
                const TreeQueryClass = require('../query/facade/TreeQuery').TreeQuery;
                let jsonQuery = new TreeQueryClass(query, columnAliases.entityAliases).toJSON(this, fieldUtils);
                jsonOperation = functionOperation.toJSON(jsonQuery);
                break;
            case ground_control_1.OperationCategory.BOOLEAN:
            case ground_control_1.OperationCategory.DATE:
            case ground_control_1.OperationCategory.NUMBER:
            case ground_control_1.OperationCategory.STRING:
            case ground_control_1.OperationCategory.UNTYPED:
                let valueOperation = operation;
                // All Non logical or exists operations are value operations (eq, isNull, like,
                // etc.)
                let jsonValueOperation = jsonOperation;
                jsonValueOperation.l = this.convertLRValue(valueOperation.l, columnAliases, fieldUtils);
                let rValue = valueOperation.r;
                if (rValue instanceof Array) {
                    jsonValueOperation.r = rValue.map((anRValue) => {
                        return this.convertLRValue(anRValue, columnAliases, fieldUtils);
                    });
                }
                else {
                    jsonValueOperation.r = this.convertLRValue(rValue, columnAliases, fieldUtils);
                }
                break;
        }
        return jsonOperation;
    }
    convertLRValue(value, columnAliases, fieldUtils) {
        value = WrapperFunctions_1.wrapPrimitive(value);
        switch (typeof value) {
            case 'undefined':
                throw new Error(`'undefined' is not a valid L or R value`);
            default:
                if (value instanceof OperableField_1.QOperableField) {
                    return value.toJSON(columnAliases, false, this, fieldUtils);
                } // Must be a Field Query
                else {
                    let rawFieldQuery = value;
                    return fieldUtils.getFieldQueryJson(rawFieldQuery, columnAliases.entityAliases, this);
                }
        }
    }
}
exports.QueryUtils = QueryUtils;
di_1.DI.set(tokens_1.QUERY_UTILS, QueryUtils);
//# sourceMappingURL=QueryUtils.js.map