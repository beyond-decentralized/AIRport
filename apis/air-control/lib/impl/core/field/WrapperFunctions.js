"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const BooleanField_1 = require("./BooleanField");
const DateField_1 = require("./DateField");
const NullFunction_1 = require("./NullFunction");
const NumberField_1 = require("./NumberField");
const StringField_1 = require("./StringField");
/**
 * Created by Papa on 12/31/2016.
 */
let utils;
function setUtilsForWrapperFunctions(utilsForFunctions) {
    utils = utilsForFunctions;
}
exports.setUtilsForWrapperFunctions = setUtilsForWrapperFunctions;
exports.bool = function (primitive) {
    if (typeof primitive !== 'boolean') {
        throw `bool() accepts booleans only.`;
    }
    return new BooleanField_1.QBooleanFunction(primitive, utils);
};
exports.date = function (primitive) {
    if (!(primitive instanceof Date)) {
        throw `date() accepts Dates only.`;
    }
    return new DateField_1.QDateFunction(primitive, utils);
};
exports.num = function (primitive) {
    if (typeof primitive !== 'number') {
        throw `num() accepts numbers only.`;
    }
    return new NumberField_1.QNumberFunction(primitive, utils);
};
exports.str = function (primitive) {
    if (typeof primitive !== 'string') {
        throw `str() accepts strings only.`;
    }
    return new StringField_1.QStringFunction(primitive, utils);
};
function wrapPrimitive(value) {
    switch (typeof value) {
        case 'boolean':
            return exports.bool(value);
        case 'number':
            return exports.num(value);
        case 'string':
            return exports.str(value);
        case 'undefined':
            throw `Cannot use an 'undefined' value in an operation.`;
    }
    if (value === null) {
        return new NullFunction_1.QNullFunction(utils);
    }
    if (value instanceof Date) {
        return exports.date(value);
    }
    return value;
}
exports.wrapPrimitive = wrapPrimitive;
function getPrimitiveValue(value, dbColumn, rowIndex, datesToNumbers = true) {
    switch (dbColumn.type) {
        case ground_control_1.SQLDataType.ANY: {
            assertDataType([
                'boolean', 'number', 'object', 'string'
            ], dbColumn, rowIndex, value);
            break;
        }
        case ground_control_1.SQLDataType.BOOLEAN: {
            assertDataType([
                'boolean'
            ], dbColumn, rowIndex, value);
            break;
        }
        case ground_control_1.SQLDataType.DATE: {
            assertDataType([
                'number', 'object'
            ], dbColumn, rowIndex, value);
            break;
        }
        case ground_control_1.SQLDataType.JSON: {
            assertDataType([
                'object'
            ], dbColumn, rowIndex, value);
            break;
        }
        case ground_control_1.SQLDataType.NUMBER: {
            assertDataType([
                'number'
            ], dbColumn, rowIndex, value);
            break;
        }
        case ground_control_1.SQLDataType.STRING: {
            assertDataType([
                'string'
            ], dbColumn, rowIndex, value);
            break;
        }
        default:
            throw 'Unexpected SQLDataType: ' + dbColumn.type;
    }
    switch (typeof value) {
        case 'boolean':
            return value ? 1 : 0;
        case 'number':
        case 'string':
            // FIXME: prevent SQL injection
            return value;
        case 'object': {
            if (value === null) {
                return value;
            }
            if (value instanceof Date) {
                if (dbColumn.type !== ground_control_1.SQLDataType.DATE) {
                    throw `Unexpected Date object for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}`;
                }
                return datesToNumbers ? value.getTime() : value;
            }
            else {
                if (dbColumn.type !== ground_control_1.SQLDataType.JSON) {
                    throw `Unexpected Json object for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}`;
                }
                return JSON.stringify(value);
            }
        }
        case 'undefined':
            throw `Cannot use an 'undefined' value in an operation.`;
        default:
            throw `Unexpected object in operation.`;
    }
}
exports.getPrimitiveValue = getPrimitiveValue;
function assertDataType(typesOfData, dbColumn, rowIndex, value) {
    if (typesOfData.indexOf(typeof value) < -1) {
        const expectedDataTypes = typesOfData.join(', ');
        throw `Unexpected typeof value for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}.  Expecting: ${expectedDataTypes}`;
    }
}
function getColumnName(dbColumn) {
    return dbColumn.name
        ? dbColumn.name
        : dbColumn.propertyColumns[0].property.name;
}
//# sourceMappingURL=WrapperFunctions.js.map