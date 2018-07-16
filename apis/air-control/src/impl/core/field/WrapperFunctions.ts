import {IQBooleanField}   from "../../../lingo/core/field/BooleanField";
import {IQDateField}      from "../../../lingo/core/field/DateField";
import {IQNumberField}    from "../../../lingo/core/field/NumberField";
import {IQStringField}    from "../../../lingo/core/field/StringField";
import {
	boolFunction,
	dateFunction,
	numFunction,
	strFunction
}                         from "../../../lingo/core/field/WrapperFunctions";
import {IUtils}           from "../../../lingo/utils/Utils";
import {QBooleanFunction} from "./BooleanField";
import {QDateFunction}    from "./DateField";
import {QNullFunction}    from "./NullFunction";
import {QNumberFunction}  from "./NumberField";
import {QStringFunction}  from "./StringField";

/**
 * Created by Papa on 12/31/2016.
 */

let utils: IUtils;

export function setUtilsForWrapperFunctions(
	utilsForFunctions: IUtils
) {
	utils = utilsForFunctions;
}

export const bool: boolFunction = function (primitive: boolean): IQBooleanField {
	if (typeof primitive !== "boolean") {
		throw `bool() accepts booleans only.`;
	}
	return new QBooleanFunction(primitive, utils);
};

export const date: dateFunction = function (primitive: Date): IQDateField {
	if (!(primitive instanceof Date)) {
		throw `date() accepts Dates only.`
	}
	return new QDateFunction(primitive, utils);
};

export const num: numFunction = function (primitive: number): IQNumberField {
	if (typeof primitive !== "number") {
		throw `num() accepts numbers only.`;
	}
	return new QNumberFunction(primitive, utils);
};

export const str: strFunction = function (primitive: string): IQStringField {
	if (typeof primitive !== "string") {
		throw `str() accepts strings only.`;
	}
	return new QStringFunction(primitive, utils);
};


export function wrapPrimitive(value: any): any {
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

export function getPrimitiveValue(
	value: any,
	datesToNumbers: boolean = true
): any {
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