import {
	DbColumn,
	SQLDataType
}                         from '@airport/ground-control'
import {IQBooleanField}   from '../../../lingo/core/field/BooleanField'
import {IQDateField}      from '../../../lingo/core/field/DateField'
import {IQNumberField}    from '../../../lingo/core/field/NumberField'
import {IQStringField}    from '../../../lingo/core/field/StringField'
import {
	boolFunction,
	dateFunction,
	numFunction,
	strFunction
}                         from '../../../lingo/core/field/WrapperFunctions'
import {QBooleanFunction} from './BooleanField'
import {QDateFunction}    from './DateField'
import {QNullFunction}    from './NullFunction'
import {QNumberFunction}  from './NumberField'
import {QStringFunction}  from './StringField'

/**
 * Created by Papa on 12/31/2016.
 */

export const bool: boolFunction = function (
	primitive: boolean
): IQBooleanField {
	if (typeof primitive !== 'boolean') {
		throw new Error(`bool() accepts booleans only.`)
	}
	return new QBooleanFunction(primitive)
}

export const date: dateFunction = function (
	primitive: Date
): IQDateField {
	if (!(primitive instanceof Date)) {
		throw new Error(`date() accepts Dates only.`)
	}
	return new QDateFunction(primitive)
}

export const num: numFunction = function (
	primitive: number
): IQNumberField {
	if (typeof primitive !== 'number') {
		throw new Error(`num() accepts numbers only.`)
	}
	return new QNumberFunction(primitive)
}

export const str: strFunction = function (
	primitive: string
): IQStringField {
	if (typeof primitive !== 'string') {
		throw new Error(`str() accepts strings only.`)
	}
	return new QStringFunction(primitive)
}


export function wrapPrimitive(value: any): any {
	switch (typeof value) {
		case 'boolean':
			return bool(value)
		case 'number':
			return num(value)
		case 'string':
			return str(value)
		case 'undefined':
			throw new Error(`Cannot use an 'undefined' value in an operation.`)
	}
	if (value === null) {
		return new QNullFunction()
	}
	if (value instanceof Date) {
		return date(value)
	}
	return value
}

export function getPrimitiveValue(
	value: any,
	dbColumn: DbColumn,
	rowIndex: number,
	datesToNumbers: boolean = true
): any {
	switch (dbColumn.type) {
		// case SQLDataType.ANY: {
		// 	assertDataType([
		// 		'boolean', 'number', 'object', 'string'
		// 	], dbColumn, rowIndex, value)
		// 	break
		// }
		case SQLDataType.BOOLEAN: {
			assertDataType([
				'boolean'
			], dbColumn, rowIndex, value)
			break
		}
		case SQLDataType.DATE: {
			assertDataType([
				'number', 'object'
			], dbColumn, rowIndex, value)
			break
		}
		// case SQLDataType.JSON: {
		// 	assertDataType([
		// 		'object'
		// 	], dbColumn, rowIndex, value)
		// 	break
		// }
		case SQLDataType.NUMBER: {
			assertDataType([
				'number'
			], dbColumn, rowIndex, value)
			break
		}
		case SQLDataType.STRING: {
			assertDataType([
				'string'
			], dbColumn, rowIndex, value)
			break
		}
		default:
			throw new Error('Unexpected SQLDataType: ' + dbColumn.type)
	}
	switch (typeof value) {
		case 'boolean':
			return value ? 1 : 0
		case 'number':
		case 'string':
			// FIXME: prevent SQL injection
			return value
		case 'object': {
			if (value === null) {
				return value
			}
			if (value instanceof Date) {
				if (dbColumn.type !== SQLDataType.DATE) {
					throw new Error(`Unexpected Date object for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}`)
				}
				return datesToNumbers ? value.getTime() : value
			} else {
				// if (dbColumn.type !== SQLDataType.JSON) {
					throw new Error(`Unexpected Json object for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}`)
				// }
				// return JSON.stringify(value)
			}
		}
		case 'undefined':
			throw new Error(`Cannot use an 'undefined' value in an operation.`)
		default:
			throw new Error(`Unexpected object in operation.`)
	}
}

function assertDataType(
	typesOfData: string[],
	dbColumn: DbColumn,
	rowIndex: number,
	value
) {
	if (typesOfData.indexOf(typeof value) < -1) {
		const expectedDataTypes = typesOfData.join(', ')
		throw new Error(`Unexpected typeof value for row: ${rowIndex + 1}, column: ${getColumnName(dbColumn)}.  Expecting: ${expectedDataTypes}`)
	}
}


function getColumnName(
	dbColumn: DbColumn
): string {
	return dbColumn.name
		? dbColumn.name
		: dbColumn.propertyColumns[0].property.name
}
