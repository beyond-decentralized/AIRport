"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    if (typeof primitive !== "boolean") {
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
    if (typeof primitive !== "number") {
        throw `num() accepts numbers only.`;
    }
    return new NumberField_1.QNumberFunction(primitive, utils);
};
exports.str = function (primitive) {
    if (typeof primitive !== "string") {
        throw `str() accepts strings only.`;
    }
    return new StringField_1.QStringFunction(primitive, utils);
};
function wrapPrimitive(value) {
    switch (typeof value) {
        case "boolean":
            return exports.bool(value);
        case "number":
            return exports.num(value);
        case "string":
            return exports.str(value);
        case "undefined":
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
function getPrimitiveValue(value, datesToNumbers = true) {
    switch (typeof value) {
        case "boolean":
        case "number":
        case "string":
            return value;
        case "object":
            if (value === null) {
                return value;
            }
            if (value instanceof Date) {
                return datesToNumbers ? value.getTime() : value;
            }
            throw `Unexpected object in operation.`;
        case "undefined":
            throw `Cannot use an 'undefined' value in an operation.`;
        default:
            throw `Unexpected object in operation.`;
    }
}
exports.getPrimitiveValue = getPrimitiveValue;
//# sourceMappingURL=WrapperFunctions.js.map