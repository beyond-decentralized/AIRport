import { QBooleanFunction } from "./BooleanField";
import { QDateFunction } from "./DateField";
import { QNullFunction } from "./NullFunction";
import { QNumberFunction } from "./NumberField";
import { QStringFunction } from "./StringField";
/**
 * Created by Papa on 12/31/2016.
 */
let utils;
export function setUtilsForWrapperFunctions(utilsForFunctions) {
    utils = utilsForFunctions;
}
export const bool = function (primitive) {
    if (typeof primitive !== "boolean") {
        throw `bool() accepts booleans only.`;
    }
    return new QBooleanFunction(primitive, utils);
};
export const date = function (primitive) {
    if (!(primitive instanceof Date)) {
        throw `date() accepts Dates only.`;
    }
    return new QDateFunction(primitive, utils);
};
export const num = function (primitive) {
    if (typeof primitive !== "number") {
        throw `num() accepts numbers only.`;
    }
    return new QNumberFunction(primitive, utils);
};
export const str = function (primitive) {
    if (typeof primitive !== "string") {
        throw `str() accepts strings only.`;
    }
    return new QStringFunction(primitive, utils);
};
export function wrapPrimitive(value) {
    switch (typeof value) {
        case "boolean":
            return bool(value);
        case "number":
            return num(value);
        case "string":
            return str(value);
        case "undefined":
            throw `Cannot use an 'undefined' value in an operation.`;
    }
    if (value === null) {
        return new QNullFunction(utils);
    }
    if (value instanceof Date) {
        return date(value);
    }
    return value;
}
export function getPrimitiveValue(value, datesToNumbers = true) {
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
//# sourceMappingURL=WrapperFunctions.js.map