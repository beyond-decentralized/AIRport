import {
	QueryBaseOperation,
	QueryFieldClause,
	QueryBaseClause,
	QueryClauseObjectType,
	QueryFunctionOperation,
	QueryFunctionCall,
	QueryTree,
	OperationCategory,
	SQLDataType,
	SqlFunction,
	SqlOperator
} from '@airport/ground-control'
import { IQUntypedField } from '../../../definition/core/field/IQUntypedField'
import { IQBooleanField } from '../../../definition/core/field/IQBooleanField'
import { IQDateField } from '../../../definition/core/field/IQDateField'
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
	plusFunction,
	replaceFunction,
	roundFunction,
	subtractFunction,
	sumFunction,
	trimFunction,
	ucaseFunction,
	unionAllFunction,
	unionFunction
} from '../../../definition/core/field/IQFunctions'
import { IQNumberField } from '../../../definition/core/field/IQNumberField'
import { IQOperableField } from '../../../definition/core/field/IQOperableField'
import { IQStringField } from '../../../definition/core/field/IQStringField'
import { RawFieldQuery } from '../../../definition/query/facade/RawFieldQuery'
import { RawNonEntityQuery } from '../../../definition/query/facade/RawNonEntityQuery'
import {
	ITreeEntity,
	RawTreeQuery
} from '../../../definition/query/facade/RawTreeQuery'
import { IAppliable } from '../../../definition/core/field/IAppliable'
import {
	QBooleanField,
	QBooleanFunction
} from './QBooleanField'
import {
	QDateField,
	QDateFunction
} from './QDateField'
import {
	QNumberField,
	QNumberFunction
} from './QNumberField'
import { QOperableField } from './QOperableField'
import {
	QStringField,
	QStringFunction
} from './QStringField'
import {
	bool,
	date,
	num,
	str
} from './WrapperFunctions'

function getSqlFunctionCall(
	sqlFunction: SqlFunction,
	parameters?: any[]
): QueryFunctionCall {
	if (parameters) {
		parameters = parameters.map((parameter) => {
			switch (typeof parameter) {
				case 'boolean':
					return bool(parameter)
				case 'number':
					return num(parameter)
				case 'string':
					return str(parameter)
				case 'undefined':
					throw new Error(`'undefined' cannot be used as a function parameter`)
			}
			if (parameter instanceof Date) {
				return date(parameter)
			}
			return parameter
		})
	}
	return {
		functionType: sqlFunction,
		functionParameters: parameters
	}
}

export const ABS: absFunction = function (
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>,
): IQNumberField {
	if (numeric instanceof QNumberField) {
		return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.AVG))
	} else {
		return new QNumberFunction(<any>numeric).applySqlFunction(getSqlFunctionCall(SqlFunction.ABS))
	}
}

export const AVG: avgFunction = function (
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric instanceof QNumberField) {
		return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.AVG))
	} else {
		return new QNumberFunction(<any>numeric).applySqlFunction(getSqlFunctionCall(SqlFunction.AVG))
	}
}

export function getFunctionObject<T extends boolean | Date | number | string>(
	value: T | RawFieldQuery<any>
): QOperableField<T, any, any, any> {
	switch (typeof value) {
		case 'boolean':
			return new QBooleanFunction(<any>value)
		case 'number':
			return new QNumberFunction(<any>value)
		case 'string':
			return new QStringFunction(<any>value)
	}
	if (value instanceof Date) {
		return new QDateFunction(<any>value)
	}
	let selectClause = (<RawFieldQuery<any>>value).SELECT
	if (selectClause instanceof QDistinctFunction) {
		selectClause = selectClause.getSelectClause()
	}
	if (selectClause instanceof QBooleanField) {
		return new QBooleanFunction(<any>value)
	} else if (selectClause instanceof QDateField) {
		return new QDateFunction(<any>value)
	} else if (selectClause instanceof QNumberField) {
		return new QNumberFunction(<any>value)
	} else if (selectClause instanceof QStringField) {
		return new QStringFunction(<any>value)
	}
	throw new Error(`Function rValue must be a primitive, Date, Field or Field query`)
}

export const COUNT: countFunction = function <T extends boolean | Date | number | string,
	IQF extends IQOperableField<T, any, any, any>>(
		value: IQF | T | RawFieldQuery<IQF>
	): IQF {
	if (value instanceof QOperableField) {
		return value.applySqlFunction(getSqlFunctionCall(SqlFunction.COUNT))
	} else {
		return getFunctionObject(<any>value)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.COUNT))
	}
}

export const MAX: maxFunction = function <T extends boolean | Date | number | string,
	IQF extends IQOperableField<T, any, any, any>>(
		value: IQF | T | RawFieldQuery<IQF>
	): IQF {
	if (value instanceof QOperableField) {
		return value.applySqlFunction(getSqlFunctionCall(SqlFunction.MAX))
	} else {
		return getFunctionObject(<any>value)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MAX))
	}
}

export const MIN: minFunction = function <T extends boolean | Date | number | string,
	IQF extends IQOperableField<T, any, any, any>>(
		value: IQF | T | RawFieldQuery<IQF>
	): IQF {
	if (value instanceof QOperableField) {
		return value.applySqlFunction(getSqlFunctionCall(SqlFunction.MIN))
	} else {
		return getFunctionObject(<any>value)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MIN))
	}
}

export const SUM: sumFunction = function (
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric instanceof QNumberField) {
		return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.SUM))
	} else {
		return new QNumberFunction(<any>numeric)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.SUM))
	}
}

export const PLUS: plusFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]))
	} else {
		return new QNumberFunction(<any>numeric1)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]))
	}
}

export function COALESCE(
	...values: (IQBooleanField | boolean | RawFieldQuery<IQBooleanField>)[]
): IQBooleanField
export function COALESCE(
	...values: (IQDateField | Date | RawFieldQuery<IQDateField>)[]
): IQDateField
export function COALESCE(
	...values: (IQNumberField | number | RawFieldQuery<IQNumberField>)[]
): IQNumberField
export function COALESCE(
	...values: (IQStringField | string | RawFieldQuery<IQStringField>)[]
): IQStringField
export function COALESCE(
	...values: (IQUntypedField | any | RawFieldQuery<IQUntypedField>)[]
): IQUntypedField
export function COALESCE(
	...values: any[]
): IQOperableField<any, any, any, any> {
	if (!values || !values.length) {
		throw new Error(`No arguments provided to the coalesce function`)
	}

	let dataType: SQLDataType
	const firstValue = values[0]
	// if (firstValue instanceof QUntypedField) {
	// 	dataType = SQLDataType.ANY
	// } else 
	if (firstValue instanceof QBooleanField || typeof firstValue === 'boolean') {
		dataType = SQLDataType.BOOLEAN
	} else if (firstValue instanceof QDateField || firstValue instanceof Date) {
		dataType = SQLDataType.DATE
	} else if (firstValue instanceof QNumberField || typeof firstValue === 'number') {
		dataType = SQLDataType.NUMBER
	} else if (firstValue instanceof QStringField || typeof firstValue === 'string') {
		dataType = SQLDataType.STRING
	} else {
		throw new Error(`Unexpected Field Type: ${firstValue.constructor.name}`)
		// dataType = SQLDataType.ANY
	}

	const otherValues = values.slice(1, values.length)
	if (firstValue instanceof QOperableField) {
		return firstValue.applySqlFunction(getSqlFunctionCall(SqlFunction.COALESCE, otherValues))
	} else {
		switch (dataType) {
			// case SQLDataType.ANY:
			// 	return new QUntypedFunction(<any>firstValue)
			// 		.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues))
			case SQLDataType.BOOLEAN:
				return new QBooleanFunction(<any>firstValue)
					.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues))
			case SQLDataType.DATE:
				return new QDateFunction(<any>firstValue)
					.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues))
			case SQLDataType.NUMBER:
				return new QNumberFunction(<any>firstValue)
					.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues))
			case SQLDataType.STRING:
				return new QStringFunction(<any>firstValue)
					.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, otherValues))
			default:
				throw new Error(`Unexpected SQLDataType: ` + dataType)
		}
	}
}

export const UCASE: ucaseFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.UCASE))
	} else {
		return new QStringFunction(<any>stringValue)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.UCASE))
	}
}

export const LCASE: lcaseFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<any>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.LCASE))
	} else {
		return <any>new QStringFunction(<any>stringValue)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.LCASE))
	}
}

export const MID: midFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
	start: IQNumberField | number | RawFieldQuery<IQNumberField>,
	length: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.MID, [start, length]))
	} else {
		return new QStringFunction(<any>stringValue)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MID, [start, length]))
	}
}

export const LEN: lenFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.LEN))
	} else {
		return new QStringFunction(<any>stringValue)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.LEN))
	}
}

export const ROUND: roundFunction = function (
	numeric: IQNumberField | number | RawFieldQuery<IQNumberField>,
	digits: IQNumberField | number | RawFieldQuery<IQNumberField> = 0
): IQNumberField {
	if (numeric instanceof QNumberField) {
		return numeric.applySqlFunction(getSqlFunctionCall(SqlFunction.ROUND, [digits]))
	} else {
		return new QNumberFunction(<any>numeric)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.ROUND, [digits]))
	}
}

export const NOW: nowFunction = function (): IQDateField {
	return new QDateFunction(null)
		.applySqlFunction(getSqlFunctionCall(SqlFunction.NOW))
}

export const FORMAT: formatFunction = function <T extends boolean | Date | number | string,
	IQF extends IQOperableField<T, any, any, IQF>>(
		format: string | IQStringField | RawFieldQuery<IQF>,
		...formatParameters: (T | IQF | RawFieldQuery<IQF>)[]
	): IQStringField {
	if (format instanceof QStringField) {
		return format.applySqlFunction(getSqlFunctionCall(SqlFunction.FORMAT, formatParameters))
	} else {
		return new QStringFunction(<any>format)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.FORMAT, formatParameters))
	}
}

export const REPLACE: replaceFunction = function (
	stringValue: IQStringField | string | RawFieldQuery<IQStringField>,
	toReplace: IQStringField | string | RawFieldQuery<IQStringField>,
	replaceWith: IQStringField | string | RawFieldQuery<IQStringField>
): IQStringField {
	if (stringValue instanceof QStringField) {
		return stringValue.applySqlFunction(getSqlFunctionCall(SqlFunction.REPLACE, [toReplace, replaceWith]))
	} else {
		return new QStringFunction(<any>stringValue)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.REPLACE, [toReplace, replaceWith]))
	}
}

export const TRIM: trimFunction = function (
	stringField: IQStringField | string | RawFieldQuery<any>
): IQStringField {
	if (stringField instanceof QStringField) {
		return stringField.applySqlFunction(getSqlFunctionCall(SqlFunction.TRIM))
	} else {
		return new QStringFunction(<any>stringField)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.TRIM))
	}
}

export abstract class StandAloneFunction {

}

export const DISTINCT: distinctFunction = function <ISelect>(
	selectClause: ISelect
): IQDistinctFunction<ISelect> {
	let distinctFunction = new QDistinctFunction<ISelect>(selectClause)
	distinctFunction.applySqlFunction(getSqlFunctionCall(SqlFunction.DISTINCT))
	return distinctFunction
}

export class QDistinctFunction<ISelect>
	extends StandAloneFunction
	implements IQDistinctFunction<ISelect>,
	IAppliable<QueryBaseClause, any> {

	__appliedFunctions__: QueryFunctionCall[] = []

	constructor(
		private selectClause: ISelect
	) {
		super()
	}

	static getSelect(
		distinct: QDistinctFunction<any>
	): any {
		return distinct.__appliedFunctions__[0].functionParameters[0]
	}

	applySqlFunction(
		sqlFunctionCall: QueryFunctionCall
	): any {
		this.__appliedFunctions__.push(sqlFunctionCall)
		return this
	}

	getSelectClause(): any {
		return this.selectClause
	}

	toQueryFragment(
		parsedSelectClause?: any
	): QueryFieldClause {
		if (this.__appliedFunctions__.length != 1) {
			throw new Error(`Not expecting and parent or child functions on "distinct"`)
		}
		if (!this.selectClause) {
			throw new Error(`SELECT clause is missing in "distinct" function.`)
		}
		let appliedFunctions = [
			getSqlFunctionCall(SqlFunction.DISTINCT)
		]
		return {
			appliedFunctions: appliedFunctions,
			dataType: null,
			fieldAlias: null,
			objectType: QueryClauseObjectType.DISTINCT_FUNCTION,
			value: <any>parsedSelectClause
		}
	}
}

export const EXISTS: existsFunction = function <IME extends ITreeEntity>(
	rawQuery: RawTreeQuery<IME>
): IQExistsFunction {
	let selectClause = rawQuery.SELECT
	if (!selectClause) {
		throw new Error(`Sub-Query must have SELECT clause defined to be used in EXITS function`)
	}
	let existsFunction = new QExistsFunction(rawQuery)
	return existsFunction.applySqlFunction(getSqlFunctionCall(SqlFunction.EXISTS))
}

export class QExistsFunction<IME extends ITreeEntity>
	extends StandAloneFunction
	implements IQExistsFunction,
	IAppliable<QueryBaseClause, any>,
	QueryBaseOperation {

	__appliedFunctions__: QueryFunctionCall[] = []
	operator = SqlOperator.EXISTS
	operationCategory = OperationCategory.FUNCTION

	constructor(
		private subQuery: RawTreeQuery<IME>
	) {
		super()
	}

	applySqlFunction(
		sqlFunctionCall: QueryFunctionCall
	): any {
		this.__appliedFunctions__.push(sqlFunctionCall)
		return this
	}

	getQuery(): RawTreeQuery<any> {
		return this.subQuery
	}

	toQueryFragment(
		parsedQuery?: QueryTree
	): QueryFunctionOperation {
		if (this.__appliedFunctions__.length != 1) {
			throw new Error(`Not expecting and parent or child functions on "exists"`)
		}
		if (!this.subQuery) {
			throw new Error(`Subquery is not defined in "exists" function.`)
		}
		let appliedFunctions = [
			getSqlFunctionCall(SqlFunction.EXISTS)
		]
		return {
			operationCategory: this.operationCategory,
			object: <QueryBaseClause>{
				appliedFunctions: appliedFunctions,
				dataType: null,
				objectType: QueryClauseObjectType.EXISTS_FUNCTION,
				value: <any>parsedQuery
			},
			operator: this.operator
		}
	}
}

// Algebra Operators

export const DIVIDE: divideFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.DIVIDE, [numeric2]))
	} else {
		return new QNumberFunction(<any>numeric1)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.DIVIDE, [numeric2]))
	}
}

export const SUBTRACT: subtractFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MINUS, [numeric2]))
	} else {
		return new QNumberFunction(<any>numeric1)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MINUS, [numeric2]))
	}
}

export const MODULUS: modulusFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MODULUS, [numeric2]))
	} else {
		return new QNumberFunction(<any>numeric1)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MODULUS, [numeric2]))
	}
}

export const MULTIPLY: multiplyFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.MULTIPLY, [numeric2]))
	} else {
		return new QNumberFunction(<any>numeric1)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.MULTIPLY, [numeric2]))
	}
}

export const ADD: addFunction = function (
	numeric1: IQNumberField | number | RawFieldQuery<IQNumberField>,
	numeric2: IQNumberField | number | RawFieldQuery<IQNumberField>
): IQNumberField {
	if (numeric1 instanceof QNumberField) {
		return numeric1.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]))
	} else {
		return new QNumberFunction(<any>numeric1)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.PLUS, [numeric2]))
	}
}

export const CONCAT: concatenateFunction = function ( //
	...fragments: (
		IQOperableField<any, any, any, any>
		| boolean
		| Date
		| number
		| string
		| RawFieldQuery<IQOperableField<any, any, any, any>>)[]): IQStringField {
	if (fragments.length > 2) {
		throw new Error(`Less than two operands passed to 'concat' function.`)
	}
	let firstFragment = fragments[0]
	let restOfFragments = fragments.slice(1)
	if (firstFragment instanceof QStringField) {
		return firstFragment.applySqlFunction(getSqlFunctionCall(SqlFunction.CONCATENATE, restOfFragments))
	} else {
		return new QStringFunction(<any>firstFragment)
			.applySqlFunction(getSqlFunctionCall(SqlFunction.CONCATENATE, restOfFragments))
	}
}

/**
 * A
 * UNION
 * B
 */
export const UNION: unionFunction = function (
	...rawQueries: RawNonEntityQuery[]
): RawNonEntityQuery {
	throw new Error('not implemented')
}


/**
 * A
 * UNION ALL
 * B
 */
export const UNION_ALL: unionAllFunction = function (
	...rawQueries: RawNonEntityQuery[]
): RawNonEntityQuery {
	throw new Error('not implemented')

}


/**
 * A
 * INTERSECT
 * B
 */
export const INTERSECT: intersectFunction = function (
	...rawQueries: RawNonEntityQuery[]
): RawNonEntityQuery {
	throw new Error('not implemented')
}


/**
 * A
 * MINUS
 * B
 */
export const EXCEPT: exceptFunction = function (
	...rawQueries: RawNonEntityQuery[]
): RawNonEntityQuery {
	throw new Error('not implemented')
}


/**
 * A
 * MINUS
 * B
 */
export const MINUS: minusFunction = EXCEPT
