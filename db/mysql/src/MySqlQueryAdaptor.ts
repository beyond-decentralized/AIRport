import {
	IAirportDatabase,
	IQEntityInternal,
	IQMetadataUtils,
	ISchemaUtils,
	Parameter
}           from '@airport/air-control'
import {DI} from '@airport/di'
import {
	JSONSqlFunctionCall,
	SQLDataType,
	SqlFunction
}           from '@airport/ground-control'
import {
	AbstractFunctionAdaptor,
	ISQLFunctionAdaptor,
	ISQLQueryAdaptor,
	ISqlValueProvider,
	SQL_QUERY_ADAPTOR
} from '@airport/fuel-hydrant-system'

/**
 * Created by Papa on 8/27/2016.
 */
export class MySqlQueryAdaptor
	implements ISQLQueryAdaptor {

	private functionAdaptor: ISQLFunctionAdaptor


	constructor() {
		this.functionAdaptor = new MySqlFunctionAdaptor()
	}

	getParameterReference(
		parameterReferences: (number | string)[],
		newReference: number | string
	): string {
		return '?'
	}

	dateToDbQuery(date: Date): string {
		let milliseconds = date.getTime()

		return '' + milliseconds
	}

	getResultArray(rawResponse: any): any[] {
		return rawResponse.res.rows
	}

	protected getResultCellRawValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any {
		return resultRow[columnName]
	}

	getResultCellValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any {
		let value = this.getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue)
		switch (dataType) {
			case SQLDataType.BOOLEAN:
				if (value !== null) {
					return !!value
				}
				break;
			case SQLDataType.DATE:
				if (value !== null) {
					return new Date(value)
				}
				break;
			case SQLDataType.JSON:
				if (value !== null) {
					return JSON.parse(value)
				}
				break;
		}
		return value
	}

	getFunctionAdaptor(): ISQLFunctionAdaptor {
		return this.functionAdaptor
	}

	getOffsetFragment(offset: number): string {
		return `
OFFSET
	${offset}`
	}

	getLimitFragment(limit: number): string {
		return `
LIMIT
	${limit}`
	}

	getParameterValue(parameter: Parameter): any {
		return this.getValue(parameter.value)
	}

	getValue(value: any): any {
		switch (typeof value) {
			case 'boolean':
				return value ? '1' : '0'
			case 'number':
			case 'string':
				return value
			case 'object':
				if (value instanceof Date) {
					return value.getTime()
				}
				throw new Error(`Unexpected object as a parameter.`)
			default:
				throw new Error(`Unexpected type of parameter '${typeof value}.'`)
		}
	}

}

export class MySqlFunctionAdaptor
	extends AbstractFunctionAdaptor {

	getFunctionCall(
		jsonFunctionCall: JSONSqlFunctionCall,
		value: string,
		qEntityMapByAlias: { [entityName: string]: IQEntityInternal },
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils,
		sqlValueProvider: ISqlValueProvider
	): string {
		let param2
		switch (jsonFunctionCall.ft) {
			case SqlFunction.ABS:
				return `ABS(${value})`
			case SqlFunction.AVG:
				return `AVG(${value})`
			case SqlFunction.COUNT:
				return `COUNT(${value})`
			case SqlFunction.MAX:
				return `MAX(${value})`
			case SqlFunction.MIN:
				return `MIN(${value})`
			case SqlFunction.SUM:
				return `SUM(${value})`
			case SqlFunction.UCASE:
				return `UPPER(${value})`
			case SqlFunction.LCASE:
				return `LOWER(${value})`
			case SqlFunction.MID:
				let start  = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils)
				let length = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[1], airDb, schemaUtils, metadataUtils)
				return `SUBSTR(${value}, ${start}, ${length})`
			case SqlFunction.LEN:
				return `LENGTH(${value})`
			case SqlFunction.ROUND:
				let digits = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils)
				return `ROUND(${value}, ${digits})`
			case SqlFunction.NOW:
				return `DATE('now')`
			case SqlFunction.FORMAT:
				let formatCall = `FORMAT('${value}', `
				for (let i = 0; i < jsonFunctionCall.p.length; i++) {
					let formatParam = jsonFunctionCall.p[i]
					formatParam     = sqlValueProvider.getFunctionCallValue(
						formatParam, airDb, schemaUtils, metadataUtils)
					formatCall      = `${formatCall}, ${formatParam}`
				}
				formatCall += ')'
				return formatCall
			case SqlFunction.REPLACE:
				let param1 = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils)
				param2 = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[1], airDb, schemaUtils, metadataUtils)
				return `REPLACE('${value}', ${param1}, ${param2})`
			case SqlFunction.TRIM:
				return `TRIM(${value})`
			case SqlFunction.DISTINCT:
				throw new Error(`Invalid placement of a distinct function`)
			case SqlFunction.EXISTS:
				throw new Error(`Invalid placement of an exists function`)
			case SqlFunction.DIVIDE:
				param2 = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils)
				return `${value} / ${param2}`
			case SqlFunction.MINUS:
				param2 = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils)
				return `${value} - ${param2}`
			case SqlFunction.MULTIPLY:
				param2 = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils)
				return `${value} * ${param2}`
			case SqlFunction.PLUS:
				param2 = sqlValueProvider.getFunctionCallValue(
					jsonFunctionCall.p[0], airDb, schemaUtils, metadataUtils)
				return `${value} + ${param2}`
			case SqlFunction.CONCATENATE:
				return jsonFunctionCall.p.reduce((
					acc,
					val
				) => {
					let primitiveValue = this.toString(
						sqlValueProvider.getFunctionCallValue(
							val, airDb, schemaUtils, metadataUtils))
					return acc + val
				}, this.toString(value))
			case SqlFunction.COALESCE:
				throw new Error('Not Implemented')
			default:
				throw new Error(`Unknown function type: ${jsonFunctionCall.ft}`)
		}
	}

	toString(val): string {
		switch (typeof val) {
			case 'string':
				return val
			case 'boolean':
			case 'number':
				return val.toString()
			case 'undefined':
				return 'null'
			case 'object':
				if (val === null) {
					return 'null'
				}
				if (val instanceof Date) {
					return val.toJSON()
				}
				throw new Error(`Unsupported value for conversion to string.`)
			default:
				throw new Error(`Unsupported value for conversion to string.`)
		}
	}
}
DI.set(SQL_QUERY_ADAPTOR, MySqlQueryAdaptor)
