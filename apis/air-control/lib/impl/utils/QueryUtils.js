import { DI } from '@airport/di';
import { OperationCategory, SqlOperator } from '@airport/ground-control';
import { QUERY_UTILS } from '../../tokens';
import { QOperableField } from '../core/field/OperableField';
import { wrapPrimitive } from '../core/field/WrapperFunctions';
import { TreeQuery } from '../query/facade/TreeQuery';
export class QueryUtils {
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
            case OperationCategory.LOGICAL:
                let logicalOperation = operation;
                let jsonLogicalOperation = jsonOperation;
                switch (operation.o) {
                    case SqlOperator.NOT:
                        jsonLogicalOperation.v = this.whereClauseToJSON(logicalOperation.v, columnAliases, fieldUtils);
                        break;
                    case SqlOperator.AND:
                    case SqlOperator.OR:
                        jsonLogicalOperation.v = logicalOperation.v.map((value) => this.whereClauseToJSON(value, columnAliases, fieldUtils));
                        break;
                    default:
                        throw new Error(`Unsupported logical operation '${operation.o}'`);
                }
                break;
            case OperationCategory.FUNCTION:
                // TODO: verify that cast of Q object is valid
                let functionOperation = operation;
                let query = functionOperation.getQuery();
                let jsonQuery = new TreeQuery(query, columnAliases.entityAliases).toJSON(this, fieldUtils);
                jsonOperation = functionOperation.toJSON(jsonQuery);
                break;
            case OperationCategory.BOOLEAN:
            case OperationCategory.DATE:
            case OperationCategory.NUMBER:
            case OperationCategory.STRING:
            case OperationCategory.UNTYPED:
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
        value = wrapPrimitive(value);
        switch (typeof value) {
            case 'undefined':
                throw new Error(`'undefined' is not a valid L or R value`);
            default:
                if (value instanceof QOperableField) {
                    return value.toJSON(columnAliases, false, this, fieldUtils);
                } // Must be a Field Query
                else {
                    let rawFieldQuery = value;
                    return fieldUtils.getFieldQueryJson(rawFieldQuery, columnAliases.entityAliases, this);
                }
        }
    }
}
DI.set(QUERY_UTILS, QueryUtils);
//# sourceMappingURL=QueryUtils.js.map