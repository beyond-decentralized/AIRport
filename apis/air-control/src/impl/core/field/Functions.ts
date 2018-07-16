import {
	JSONBaseOperation,
	JSONClauseField,
	JSONClauseObject,
	JSONClauseObjectType,
	JSONFunctionOperation,
	JSONSqlFunctionCall,
	JsonTreeQuery,
	OperationCategory,
	SqlFunction,
	SqlOperator
}                          from "@airport/ground-control";
import {IQDateField}       from "../../../lingo/core/field/DateField";
import {
	absFunction,
	addFunction,
	avgFunction,
	concatenateFunction,
	countFunction,
	distinctFunction,
	divideFunction,
	exceptFunction,
	existsFunction,
	formatFunction,
	intersectFunction,
	IQDistinctFunction,
	IQExistsFunction,
	lcaseFunction,
	lenFunction,
	maxFunction,
	midFunction,
	minFunction,
	minusFunction,
	modulusFunction,
	multiplyFunction,
	nowFunction,
	replaceFunction,
	roundFunction,
	subtractFunction,
	sumFunction,
	trimFunction,
	ucaseFunction,
	unionAllFunction,
	unionFunction
}                          from "../../../lingo/core/field/Functions";
import {IQNumberField}     from "../../../lingo/core/field/NumberField";
import {IQOperableField}   from "../../../lingo/core/field/OperableField";
import {IQStringField}     from "../../../lingo/core/field/StringField";
import {RawFieldQuery}     from "../../../lingo/query/facade/FieldQuery";
import {RawNonEntityQuery} from "../../../lingo/query/facade/NonEntityQuery";
import {
	ITreeEntity,
	RawTreeQuery
}                          from "../../../lingo/query/facade/TreeQuery";
import {IUtils}            from "../../../lingo/utils/Utils";
import {IAppliable}        from "./Appliable";
import {
	QBooleanField,
	QBooleanFunction
}                          from "./BooleanField";
import {
	QDateField,
	QDateFunction
}                          from "./DateField";
import {
	QNumberField,
	QNumberFunction
}                          from "./NumberField";
import {QOperableField}    from "./OperableField";
import {
	QStringField,
	QStringFunction
}                          from "./StringField";
import {
	bool,
	date,
	num,
	str
}                          from "./WrapperFunctions";


let utils: IUtils;

export function setUtilsForFunctions(
	utilsForFunctions: IUtils
) {
	utils = utilsForFunctions;
}

function getSqlFunctionCall(
	sqlFunction: SqlFunction,
	parameters?: any[]
): JSONSqlFunctionCall {
	if (parameters) {
		parameters = parameters.map((parameter) => {
			switch (typeof parameter) {
				case "boolean":
					return bool(parameter);
				case "number":
					return num(parameter);
				case "string":
					return str(parameter);
				case "undefined":
					throw `'undefined' cannot be used as a function parameter`;
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

export const abs: absFunction = function (
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>,
): IQNumberField {
	if (numeric instanceof QNumberField) {
		return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
	} else {
		return new QNumberFunction(<any>numeric, utils).applySqlFunction(getSqlFunctionCall(SqlFunction.ABS));
	}
};

export const avg: avgFunction = function (
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric instanceof QNumberField) {
		return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
	} else {
		return new QNumberFunction(<any>numeric, utils).applySqlFunction(getSqlFunctionCall(SqlFunction.AVG));
	}
};

export function getFunctionObject<T extends boolean | Date | number | string>(
	value: T | RawFieldQuery<any>
): QOperableField<T, any, any, any> {
	switch (typeof value) {
		case 'boolean':
			return new QBooleanFunction(<any>value, utils);
		case 'number':
			return new QNumberFunction(<any>value, utils);
		case 'string':
			return new QStringFunction(<any>value, utils);
	}
	if (value instanceof Date) {
		return new QDateFunction(<any>value, utils);
	}
	let selectClause = (<RawFieldQuery<any>>value).select;
	if (selectClause instanceof QDistinctFunction) {
		selectClause = selectClause.getSelectClause();
	}
	if (selectClause instanceof QBooleanField) {
		return new QBooleanFunction(<any>value, utils);
	} else if (selectClause instanceof QDateField) {
		return new QDateFunction(<any>value, utils);
	} else if (selectClause instanceof QNumberField) {
		return new QNumberFunction(<any>value, utils);
	} else if (selectClause instanceof QStringField) {
		return new QStringFunction(<any>value, utils);
	}
	throw `Function rValue must be a primitive, Date, Field or Field query`;
}

export const count: countFunction = function <T extends boolean | Date | number | string,
	IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF {
	if (value instanceof QOperableField) {
		return value.applySqlFunction(getSqlFunctionCall(SqlFunction.COUNT));
	} else {
		return getFunctionObject(<any>value).applySqlFunction(getSqlFunctionCall(SqlFunction.COUNT));
	}
};

export const max: maxFunction = function <T extends boolean | Date | number | string,
	IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF {
	if (value instanceof QOperableField) {
		return value.applySqlFunction(getSqlFunctionCall(SqlFunction.MAX));
	} else {
		return getFunctionObject(<any>value).applySqlFunction(getSqlFunctionCall(SqlFunction.MAX));
	}
};

export const min: minFunction = function <T extends boolean | Date | number | string,
	IQF extends IQOperableField<T, any, any, any>>(
	value: IQF | T | RawFieldQuery<IQF>
): IQF {
	if (value instanceof QOperableField) {
		return value.applySqlFunction(getSqlFunctionCall(SqlFunction.MIN));
	} else {
		return getFunctionObject(<any>value).applySqlFunction(getSqlFunctionCall(SqlFunction.MIN));
	}
};

export const sum: sumFunction = function (
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric instanceof QNumberField) {
		return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.SUM));
	} else {
		return new QNumberFunction(<any>numeric, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.SUM));
	}
};

export const ucase: ucaseFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.UCASE));
	} else {
		return new QStringFunction(<any>stringValue, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.UCASE));
	}
};

export const lcase: lcaseFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<any>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.LCASE));
	} else {
		return <any>new QStringFunction(<any>stringValue, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.LCASE));
	}
};

export const mid: midFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
	start: IQNumberField | number | RawFieldQuery<IQNumberField>,
	length: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.MID, [start, length]));
	} else {
		return new QStringFunction(<any>stringValue, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MID, [start, length]));
	}
};

export const len: lenFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.LEN));
	} else {
		return new QStringFunction(<any>stringValue, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.LEN));
	}
};

export const round: roundFunction = function (
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>,
	digits: IQNumberField | number | RawFieldQuery<IQNumberField> = 0
): IQNumberField {
	if (numeric instanceof QNumberField) {
		return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.ROUND, [digits]));
	} else {
		return new QNumberFunction(<any>numeric, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.ROUND, [digits]));
	}
};

export const now: nowFunction = function (): IQDateField {
	return new QDateFunction(null, utils)
		.applySqlFunction(getSqlFunctionCall(SqlFunction.NOW));
};

export const format: formatFunction = function <T extends boolean | Date | number | string,
	IQF extends IQOperableField<T, any, any, IQF>>(
	format: string | IQStringField | RawFieldQuery<IQF>,
	...formatParameters: (T | IQF | RawFieldQuery<IQF>)[]
): IQStringField {
	if (format instanceof QStringField) {
		return format.applySqlFunction(getSqlFunctionCall(SqlFunction.FORMAT, formatParameters));
	} else {
		return new QStringFunction(<any>format, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.FORMAT, formatParameters));
	}
};

export const replace: replaceFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
	toReplace: IQStringField | string | RawFieldQuery<IQStringField>,
	replaceWith: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.REPLACE, [toReplace, replaceWith]));
	} else {
		return new QStringFunction(<any>stringValue, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.REPLACE, [toReplace, replaceWith]));
	}
};

export const trim: trimFunction = function (
	stringField: IQStringField | string | RawFieldQuery<any>
): IQStringField {
	if (stringField instanceof QStringField) {
		return stringField.applySqlFunction(getSqlFunctionCall(SqlFunction.TRIM));
	} else {
		return new QStringFunction(<any>stringField, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.TRIM));
	}
};

export abstract class StandAloneFunction {

}

export const distinct: distinctFunction = function <ISelect>(
	selectClause: ISelect
): IQDistinctFunction<ISelect> {
	let distinctFunction = new QDistinctFunction<ISelect>(selectClause);
	distinctFunction.applySqlFunction(getSqlFunctionCall(SqlFunction.DISTINCT));
	return distinctFunction;
};

export class QDistinctFunction<ISelect>
	extends StandAloneFunction
	implements IQDistinctFunction<ISelect>,
		IAppliable<JSONClauseObject, any> {

	__appliedFunctions__: JSONSqlFunctionCall[] = [];

	constructor(
		private selectClause: ISelect
	) {
		super();
	}

	static getSelect(
		distinct: QDistinctFunction<any>
	): any {
		return distinct.__appliedFunctions__[0].p[0];
	}

	applySqlFunction(
		sqlFunctionCall: JSONSqlFunctionCall
	): any {
		this.__appliedFunctions__.push(sqlFunctionCall);
		return this;
	}

	getSelectClause(): any {
		return this.selectClause;
	}

	toJSON(
		parsedSelectClause?: any
	): JSONClauseField {
		if (this.__appliedFunctions__.length != 1) {
			throw `Not expecting and parent or child functions on "distinct"`;
		}
		if (!this.selectClause) {
			throw `SELECT clause is missing in "distinct" function.`;
		}
		let appliedFunctions = [
			getSqlFunctionCall(SqlFunction.DISTINCT)
		];
		return {
			af: appliedFunctions,
			dt: null,
			fa: null,
			ot: JSONClauseObjectType.DISTINCT_FUNCTION,
			v: <any>parsedSelectClause
		};
	}
}

export const exists: existsFunction = function <IME extends ITreeEntity>(
	rawQuery: RawTreeQuery<IME>
): IQExistsFunction {
	let selectClause = rawQuery.select;
	if (!selectClause) {
		throw `Sub-Query must have SELECT clause defined to be used in EXITS function`;
	}
	let existsFunction = new QExistsFunction(rawQuery);
	return existsFunction.applySqlFunction(getSqlFunctionCall(SqlFunction.EXISTS));
};

export class QExistsFunction<IME extends ITreeEntity>
	extends StandAloneFunction
	implements IQExistsFunction,
		IAppliable<JSONClauseObject, any>,
		JSONBaseOperation {

	__appliedFunctions__: JSONSqlFunctionCall[] = [];
	operator                                    = SqlOperator.EXISTS;
	o                                           = SqlOperator.EXISTS;
	category                                    = OperationCategory.FUNCTION;
	c                                           = OperationCategory.FUNCTION;

	constructor(
		private subQuery: RawTreeQuery<IME>
	) {
		super();
	}

	applySqlFunction(
		sqlFunctionCall: JSONSqlFunctionCall
	): any {
		this.__appliedFunctions__.push(sqlFunctionCall);
		return this;
	}

	getQuery(): RawTreeQuery<any> {
		return this.subQuery;
	}

	toJSON(
		parsedQuery?: JsonTreeQuery
	): JSONFunctionOperation {
		if (this.__appliedFunctions__.length != 1) {
			throw `Not expecting and parent or child functions on "exists"`;
		}
		if (!this.subQuery) {
			throw `Subquery is not defined in "exists" function.`;
		}
		let appliedFunctions = [
			getSqlFunctionCall(SqlFunction.EXISTS)
		];
		return {
			c: this.category,
			ob: <JSONClauseObject>{
				af: appliedFunctions,
				dt: null,
				ot: JSONClauseObjectType.EXISTS_FUNCTION,
				v: <any>parsedQuery
			},
			o: this.operator
		};
	}
}

// Algebra Operators

export const divide: divideFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.DIVIDE, [numeric2]));
	} else {
		return new QNumberFunction(<any>numeric1, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.DIVIDE, [numeric2]));
	}
};

export const subtract: subtractFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MINUS, [numeric2]));
	} else {
		return new QNumberFunction(<any>numeric1, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MINUS, [numeric2]));
	}
};

export const modulus: modulusFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MODULUS, [numeric2]));
	} else {
		return new QNumberFunction(<any>numeric1, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MODULUS, [numeric2]));
	}
};

export const multiply: multiplyFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MULTIPLY, [numeric2]));
	} else {
		return new QNumberFunction(<any>numeric1, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MULTIPLY, [numeric2]));
	}
};

export const add: addFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]));
	} else {
		return new QNumberFunction(<any>numeric1, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]));
	}
};

export const concat: concatenateFunction = function ( //
	...fragments: (
		IQOperableField<any, any, any, any>
		| boolean
		| Date
		| number
		| string
		| RawFieldQuery<IQOperableField<any, any, any, any>>)[]): IQStringField {
	if (fragments.length > 2) {
		throw `Less than two operands passed to 'concat' function.`;
	}
	let firstFragment   = fragments[0];
	let restOfFragments = fragments.slice(1);
	if (firstFragment instanceof QStringField) {
		return firstFragment.applySqlFunction(getSqlFunctionCall(SqlFunction.CONCATENATE, restOfFragments));
	} else {
		return new QStringFunction(<any>firstFragment, utils)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.CONCATENATE, restOfFragments));
	}
};

/**
 * A
 * UNION
 * B
 */
export const union: unionFunction = function (
	...rawQueries: RawNonEntityQuery[]
): RawNonEntityQuery {
	throw 'not implemented';
};


/**
 * A
 * UNION ALL
 * B
 */
export const unionAll: unionAllFunction = function (
	...rawQueries: RawNonEntityQuery[]
): RawNonEntityQuery {
	throw 'not implemented';

};


/**
 * A
 * INTERSECT
 * B
 */
export const intersect: intersectFunction = function (
	...rawQueries: RawNonEntityQuery[]
): RawNonEntityQuery {
	throw 'not implemented';
};


/**
 * A
 * MINUS
 * B
 */
export const except: exceptFunction = function (
	...rawQueries: RawNonEntityQuery[]
): RawNonEntityQuery {
	throw 'not implemented';
};


/**
 * A
 * MINUS
 * B
 */
export const minus: minusFunction = except;