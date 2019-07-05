"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const BooleanField_1 = require("./BooleanField");
const DateField_1 = require("./DateField");
const NumberField_1 = require("./NumberField");
const OperableField_1 = require("./OperableField");
const StringField_1 = require("./StringField");
const UntypedField_1 = require("./UntypedField");
const WrapperFunctions_1 = require("./WrapperFunctions");
function getSqlFunctionCall(sqlFunction, parameters) {
    if (parameters) {
        parameters = parameters.map((parameter) => {
            switch (typeof parameter) {
                case 'boolean':
                    return WrapperFunctions_1.bool(parameter);
                case 'number':
                    return WrapperFunctions_1.num(parameter);
                case 'string':
                    return WrapperFunctions_1.str(parameter);
                case 'undefined':
                    throw new Error(`'undefined' cannot be used as a function parameter`);
            }
            if (parameter instanceof Date) {
                return WrapperFunctions_1.date(parameter);
            }
            return parameter;
        });
    }
    return {
        ft: sqlFunction,
        p: parameters
    };
}
exports.abs = function (numeric) {
    if (numeric instanceof NumberField_1.QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.AVG));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric).applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.ABS));
    }
};
exports.avg = function (numeric) {
    if (numeric instanceof NumberField_1.QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.AVG));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric).applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.AVG));
    }
};
function getFunctionObject(value) {
    switch (typeof value) {
        case 'boolean':
            return new BooleanField_1.QBooleanFunction(value);
        case 'number':
            return new NumberField_1.QNumberFunction(value);
        case 'string':
            return new StringField_1.QStringFunction(value);
    }
    if (value instanceof Date) {
        return new DateField_1.QDateFunction(value);
    }
    let selectClause = value.select;
    if (selectClause instanceof QDistinctFunction) {
        selectClause = selectClause.getSelectClause();
    }
    if (selectClause instanceof BooleanField_1.QBooleanField) {
        return new BooleanField_1.QBooleanFunction(value);
    }
    else if (selectClause instanceof DateField_1.QDateField) {
        return new DateField_1.QDateFunction(value);
    }
    else if (selectClause instanceof NumberField_1.QNumberField) {
        return new NumberField_1.QNumberFunction(value);
    }
    else if (selectClause instanceof StringField_1.QStringField) {
        return new StringField_1.QStringFunction(value);
    }
    throw new Error(`Function rValue must be a primitive, Date, Field or Field query`);
}
exports.getFunctionObject = getFunctionObject;
exports.count = function (value) {
    if (value instanceof OperableField_1.QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.COUNT));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.COUNT));
    }
};
exports.max = function (value) {
    if (value instanceof OperableField_1.QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MAX));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MAX));
    }
};
exports.min = function (value) {
    if (value instanceof OperableField_1.QOperableField) {
        return value.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MIN));
    }
    else {
        return getFunctionObject(value)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MIN));
    }
};
exports.sum = function (numeric) {
    if (numeric instanceof NumberField_1.QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.SUM));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.SUM));
    }
};
exports.plus = function (numeric1, numeric2) {
    if (numeric1 instanceof NumberField_1.QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, [numeric2]));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, [numeric2]));
    }
};
function coalesce(...values) {
    if (!values || !values.length) {
        throw new Error(`No arguments provided to the coalesce function`);
    }
    let dataType;
    const firstValue = values[0];
    if (firstValue instanceof UntypedField_1.QUntypedField) {
        dataType = ground_control_1.SQLDataType.ANY;
    }
    else if (firstValue instanceof BooleanField_1.QBooleanField || typeof firstValue === 'boolean') {
        dataType = ground_control_1.SQLDataType.BOOLEAN;
    }
    else if (firstValue instanceof DateField_1.QDateField || firstValue instanceof Date) {
        dataType = ground_control_1.SQLDataType.DATE;
    }
    else if (firstValue instanceof NumberField_1.QNumberField || typeof firstValue === 'number') {
        dataType = ground_control_1.SQLDataType.NUMBER;
    }
    else if (firstValue instanceof StringField_1.QStringField || typeof firstValue === 'string') {
        dataType = ground_control_1.SQLDataType.STRING;
    }
    else {
        dataType = ground_control_1.SQLDataType.ANY;
    }
    const otherValues = values.slice(1, values.length);
    if (firstValue instanceof OperableField_1.QOperableField) {
        return firstValue.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.COALESCE, otherValues));
    }
    else {
        switch (dataType) {
            case ground_control_1.SQLDataType.ANY:
                return new UntypedField_1.QUntypedFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, otherValues));
            case ground_control_1.SQLDataType.BOOLEAN:
                return new BooleanField_1.QBooleanFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, otherValues));
            case ground_control_1.SQLDataType.DATE:
                return new DateField_1.QDateFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, otherValues));
            case ground_control_1.SQLDataType.NUMBER:
                return new NumberField_1.QNumberFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, otherValues));
            case ground_control_1.SQLDataType.STRING:
                return new StringField_1.QStringFunction(firstValue)
                    .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, otherValues));
            default:
                throw new Error(`Unexpected SQLDataType: ` + dataType);
        }
    }
}
exports.coalesce = coalesce;
exports.ucase = function (stringValue) {
    if (stringValue instanceof StringField_1.QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.UCASE));
    }
    else {
        return new StringField_1.QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.UCASE));
    }
};
exports.lcase = function (stringValue) {
    if (stringValue instanceof StringField_1.QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.LCASE));
    }
    else {
        return new StringField_1.QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.LCASE));
    }
};
exports.mid = function (stringValue, start, length) {
    if (stringValue instanceof StringField_1.QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MID, [start, length]));
    }
    else {
        return new StringField_1.QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MID, [start, length]));
    }
};
exports.len = function (stringValue) {
    if (stringValue instanceof StringField_1.QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.LEN));
    }
    else {
        return new StringField_1.QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.LEN));
    }
};
exports.round = function (numeric, digits = 0) {
    if (numeric instanceof NumberField_1.QNumberField) {
        return numeric.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.ROUND, [digits]));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.ROUND, [digits]));
    }
};
exports.now = function () {
    return new DateField_1.QDateFunction(null)
        .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.NOW));
};
exports.format = function (format, ...formatParameters) {
    if (format instanceof StringField_1.QStringField) {
        return format.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.FORMAT, formatParameters));
    }
    else {
        return new StringField_1.QStringFunction(format)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.FORMAT, formatParameters));
    }
};
exports.replace = function (stringValue, toReplace, replaceWith) {
    if (stringValue instanceof StringField_1.QStringField) {
        return stringValue.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.REPLACE, [toReplace, replaceWith]));
    }
    else {
        return new StringField_1.QStringFunction(stringValue)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.REPLACE, [toReplace, replaceWith]));
    }
};
exports.trim = function (stringField) {
    if (stringField instanceof StringField_1.QStringField) {
        return stringField.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.TRIM));
    }
    else {
        return new StringField_1.QStringFunction(stringField)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.TRIM));
    }
};
class StandAloneFunction {
}
exports.StandAloneFunction = StandAloneFunction;
exports.distinct = function (selectClause) {
    let distinctFunction = new QDistinctFunction(selectClause);
    distinctFunction.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.DISTINCT));
    return distinctFunction;
};
class QDistinctFunction extends StandAloneFunction {
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
            getSqlFunctionCall(ground_control_1.SqlFunction.DISTINCT)
        ];
        return {
            af: appliedFunctions,
            dt: null,
            fa: null,
            ot: ground_control_1.JSONClauseObjectType.DISTINCT_FUNCTION,
            v: parsedSelectClause
        };
    }
}
exports.QDistinctFunction = QDistinctFunction;
exports.exists = function (rawQuery) {
    let selectClause = rawQuery.select;
    if (!selectClause) {
        throw new Error(`Sub-Query must have SELECT clause defined to be used in EXITS function`);
    }
    let existsFunction = new QExistsFunction(rawQuery);
    return existsFunction.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.EXISTS));
};
class QExistsFunction extends StandAloneFunction {
    constructor(subQuery) {
        super();
        this.subQuery = subQuery;
        this.__appliedFunctions__ = [];
        this.operator = ground_control_1.SqlOperator.EXISTS;
        this.o = ground_control_1.SqlOperator.EXISTS;
        this.category = ground_control_1.OperationCategory.FUNCTION;
        this.c = ground_control_1.OperationCategory.FUNCTION;
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
            getSqlFunctionCall(ground_control_1.SqlFunction.EXISTS)
        ];
        return {
            c: this.category,
            ob: {
                af: appliedFunctions,
                dt: null,
                ot: ground_control_1.JSONClauseObjectType.EXISTS_FUNCTION,
                v: parsedQuery
            },
            o: this.operator
        };
    }
}
exports.QExistsFunction = QExistsFunction;
// Algebra Operators
exports.divide = function (numeric1, numeric2) {
    if (numeric1 instanceof NumberField_1.QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.DIVIDE, [numeric2]));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.DIVIDE, [numeric2]));
    }
};
exports.subtract = function (numeric1, numeric2) {
    if (numeric1 instanceof NumberField_1.QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MINUS, [numeric2]));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MINUS, [numeric2]));
    }
};
exports.modulus = function (numeric1, numeric2) {
    if (numeric1 instanceof NumberField_1.QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MODULUS, [numeric2]));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MODULUS, [numeric2]));
    }
};
exports.multiply = function (numeric1, numeric2) {
    if (numeric1 instanceof NumberField_1.QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MULTIPLY, [numeric2]));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.MULTIPLY, [numeric2]));
    }
};
exports.add = function (numeric1, numeric2) {
    if (numeric1 instanceof NumberField_1.QNumberField) {
        return numeric1.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, [numeric2]));
    }
    else {
        return new NumberField_1.QNumberFunction(numeric1)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.PLUS, [numeric2]));
    }
};
exports.concat = function (//
...fragments) {
    if (fragments.length > 2) {
        throw new Error(`Less than two operands passed to 'concat' function.`);
    }
    let firstFragment = fragments[0];
    let restOfFragments = fragments.slice(1);
    if (firstFragment instanceof StringField_1.QStringField) {
        return firstFragment.applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.CONCATENATE, restOfFragments));
    }
    else {
        return new StringField_1.QStringFunction(firstFragment)
            .applySqlFunction(getSqlFunctionCall(ground_control_1.SqlFunction.CONCATENATE, restOfFragments));
    }
};
/**
 * A
 * UNION
 * B
 */
exports.union = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * UNION ALL
 * B
 */
exports.unionAll = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * INTERSECT
 * B
 */
exports.intersect = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * MINUS
 * B
 */
exports.except = function (...rawQueries) {
    throw new Error('not implemented');
};
/**
 * A
 * MINUS
 * B
 */
exports.minus = exports.except;
//# sourceMappingURL=Functions.js.map