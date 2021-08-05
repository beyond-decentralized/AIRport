import { JSONClauseObjectType, OperationCategory, SQLDataType, SqlFunction, SqlOperator } from '@airport/ground-control';
import { QBooleanField, QBooleanFunction } from './BooleanField';
import { QDateField, QDateFunction } from './DateField';
import { QNumberField, QNumberFunction } from './NumberField';
import { QOperableField } from './OperableField';
import { QStringField, QStringFunction } from './StringField';
import { bool, date, num, str } from './WrapperFunctions';
function getSqlFunctionCall(sqlFunction, parameters) {
    if (parameters) {
        parameters = parameters.map((parameter) => {
            switch (typeof parameter) {
                case 'boolean':
                    return bool(parameter);
                case 'number':
                    return num(parameter);
                case 'string':
                    return str(parameter);
                case 'undefined':
                    throw new Error(`'undefined' cannot be used as a function parameter`);
            }
            if (parameter instanceof Date) {
                return date(parameter);
            }
            return parameter;
        });
    }
    return {
        ft: sqlFunction,
        p: parameters
    };
}
export const abs = function (numeric) {
    if (numeric instanceof QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
    }
    else {
        return new QNumberFunction(numeric).applySqlFunction(getSqlFunctionCall(SqlFunction.ABS));
    }
};
export const avg = function (numeric) {
    if (numeric instanceof QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
    }
    else {
        return new QNumberFunction(numeric).applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
    }
};
export function getFunctionObject(value) {
    switch (typeof value) {
        case 'boolean':
            return new QBooleanFunction(value);
        case 'number':
            return new QNumberFunction(value);
        case 'string':
            return new QStringFunction(value);
    }
    if (value instanceof Date) {
        return new QDateFunction(value);
    }
    let selectClause = value.select;
    if (selectClause instanceof QDistinctFunction) {
        selectClause = selectClause.getSelectClause();
    }
    if (selectClause instanceof QBooleanField) {
        return new QBooleanFunction(value);
    }
    else if (selectClause instanceof QDateField) {
        return new QDateFunction(value);
    }
    else if (selectClause instanceof QNumberField) {
        return new QNumberFunction(value);
    }
    else if (selectClause instanceof QStringField) {
        return new QStringFunction(value);
    }
    throw new Error(`Function rValue must be a primitive, Date, Field or Field query`);
}
export const count = function (value) {
    if (value instanceof QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(SqlFunction.COUNT));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.COUNT));
    }
};
export const max = function (value) {
    if (value instanceof QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(SqlFunction.MAX));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MAX));
    }
};
export const min = function (value) {
    if (value instanceof QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(SqlFunction.MIN));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MIN));
    }
};
export const sum = function (numeric) {
    if (numeric instanceof QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.SUM));
    }
    else {
        return new QNumberFunction(numeric)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.SUM));
    }
};
export const plus = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]));
    }
};
export function coalesce(...values) {
    if (!values || !values.length) {
        throw new Error(`No arguments provided to the coalesce function`);
    }
    let dataType;
    const firstValue = values[0];
    // if (firstValue instanceof QUntypedField) {
    // 	dataType = SQLDataType.ANY
    // } else 
    if (firstValue instanceof QBooleanField || typeof firstValue === 'boolean') {
        dataType = SQLDataType.BOOLEAN;
    }
    else if (firstValue instanceof QDateField || firstValue instanceof Date) {
        dataType = SQLDataType.DATE;
    }
    else if (firstValue instanceof QNumberField || typeof firstValue === 'number') {
        dataType = SQLDataType.NUMBER;
    }
    else if (firstValue instanceof QStringField || typeof firstValue === 'string') {
        dataType = SQLDataType.STRING;
    }
    else {
        throw new Error(`Unexpected Field Type: ${firstValue.constructor.name}`);
        // dataType = SQLDataType.ANY
    }
    const otherValues = values.slice(1, values.length);
    if (firstValue instanceof QOperableField) {
        return firstValue.applySqlFunction(getSqlFunctionCall(SqlFunction.COALESCE, otherValues));
    }
    else {
        switch (dataType) {
            // case SQLDataType.ANY:
            // 	return new QUntypedFunction(<any>firstValue)
            // 		.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues))
            case SQLDataType.BOOLEAN:
                return new QBooleanFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues));
            case SQLDataType.DATE:
                return new QDateFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues));
            case SQLDataType.NUMBER:
                return new QNumberFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues));
            case SQLDataType.STRING:
                return new QStringFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues));
            default:
                throw new Error(`Unexpected SQLDataType: ` + dataType);
        }
    }
}
export const ucase = function (stringValue) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.UCASE));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.UCASE));
    }
};
export const lcase = function (stringValue) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.LCASE));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.LCASE));
    }
};
export const mid = function (stringValue, start, length) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.MID, [start, length]));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MID, [start, length]));
    }
};
export const len = function (stringValue) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.LEN));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.LEN));
    }
};
export const round = function (numeric, digits = 0) {
    if (numeric instanceof QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.ROUND, [digits]));
    }
    else {
        return new QNumberFunction(numeric)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.ROUND, [digits]));
    }
};
export const now = function () {
    return new QDateFunction(null)
        .applySqlFunction(getSqlFunctionCall(SqlFunction.NOW));
};
export const format = function (format, ...formatParameters) {
    if (format instanceof QStringField) {
        return format.applySqlFunction(getSqlFunctionCall(SqlFunction.FORMAT, formatParameters));
    }
    else {
        return new QStringFunction(format)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.FORMAT, formatParameters));
    }
};
export const replace = function (stringValue, toReplace, replaceWith) {
    if (stringValue instanceof QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.REPLACE, [toReplace, replaceWith]));
    }
    else {
        return new QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.REPLACE, [toReplace, replaceWith]));
    }
};
export const trim = function (stringField) {
    if (stringField instanceof QStringField) {
        return stringField.applySqlFunction(getSqlFunctionCall(SqlFunction.TRIM));
    }
    else {
        return new QStringFunction(stringField)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.TRIM));
    }
};
export class StandAloneFunction {
}
export const distinct = function (selectClause) {
    let distinctFunction = new QDistinctFunction(selectClause);
    distinctFunction.applySqlFunction(getSqlFunctionCall(SqlFunction.DISTINCT));
    return distinctFunction;
};
export class QDistinctFunction extends StandAloneFunction {
    constructor(selectClause) {
        super();
        this.selectClause = selectClause;
        this.__appliedFunctions__ = [];
    }
    static getSelect(distinct) {
        return distinct.__appliedFunctions__[0].p[0];
    }
    applySqlFunction(sqlFunctionCall) {
        this.__appliedFunctions__.push(sqlFunctionCall);
        return this;
    }
    getSelectClause() {
        return this.selectClause;
    }
    toJSON(parsedSelectClause) {
        if (this.__appliedFunctions__.length != 1) {
            throw new Error(`Not expecting and parent or child functions on "distinct"`);
        }
        if (!this.selectClause) {
            throw new Error(`SELECT clause is missing in "distinct" function.`);
        }
        let appliedFunctions = [
            getSqlFunctionCall(SqlFunction.DISTINCT)
        ];
        return {
            af: appliedFunctions,
            dt: null,
            fa: null,
            ot: JSONClauseObjectType.DISTINCT_FUNCTION,
            v: parsedSelectClause
        };
    }
}
export const exists = function (rawQuery) {
    let selectClause = rawQuery.select;
    if (!selectClause) {
        throw new Error(`Sub-Query must have SELECT clause defined to be used in EXITS function`);
    }
    let existsFunction = new QExistsFunction(rawQuery);
    return existsFunction.applySqlFunction(getSqlFunctionCall(SqlFunction.EXISTS));
};
export class QExistsFunction extends StandAloneFunction {
    constructor(subQuery) {
        super();
        this.subQuery = subQuery;
        this.__appliedFunctions__ = [];
        this.operator = SqlOperator.EXISTS;
        this.o = SqlOperator.EXISTS;
        this.category = OperationCategory.FUNCTION;
        this.c = OperationCategory.FUNCTION;
    }
    applySqlFunction(sqlFunctionCall) {
        this.__appliedFunctions__.push(sqlFunctionCall);
        return this;
    }
    getQuery() {
        return this.subQuery;
    }
    toJSON(parsedQuery) {
        if (this.__appliedFunctions__.length != 1) {
            throw new Error(`Not expecting and parent or child functions on "exists"`);
        }
        if (!this.subQuery) {
            throw new Error(`Subquery is not defined in "exists" function.`);
        }
        let appliedFunctions = [
            getSqlFunctionCall(SqlFunction.EXISTS)
        ];
        return {
            c: this.category,
            ob: {
                af: appliedFunctions,
                dt: null,
                ot: JSONClauseObjectType.EXISTS_FUNCTION,
                v: parsedQuery
            },
            o: this.operator
        };
    }
}
// Algebra Operators
export const divide = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.DIVIDE, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.DIVIDE, [numeric2]));
    }
};
export const subtract = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MINUS, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MINUS, [numeric2]));
    }
};
export const modulus = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MODULUS, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MODULUS, [numeric2]));
    }
};
export const multiply = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MULTIPLY, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.MULTIPLY, [numeric2]));
    }
};
export const add = function (numeric1, numeric2) {
    if (numeric1 instanceof QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]));
    }
    else {
        return new QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]));
    }
};
export const concat = function (//
...fragments) {
    if (fragments.length > 2) {
        throw new Error(`Less than two operands passed to 'concat' function.`);
    }
    let firstFragment = fragments[0];
    let restOfFragments = fragments.slice(1);
    if (firstFragment instanceof QStringField) {
        return firstFragment.applySqlFunction(getSqlFunctionCall(SqlFunction.CONCATENATE, restOfFragments));
    }
    else {
        return new QStringFunction(firstFragment)
            .applySqlFunction(getSqlFunctionCall(SqlFunction.CONCATENATE, restOfFragments));
    }
};
/**
 * A
 * UNION
 * B
 */
export const union = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * UNION ALL
 * B
 */
export const unionAll = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * INTERSECT
 * B
 */
export const intersect = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * MINUS
 * B
 */
export const except = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * MINUS
 * B
 */
export const minus = except;
//# sourceMappingURL=Functions.js.map