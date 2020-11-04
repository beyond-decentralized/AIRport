import {Parameter}   from '@airport/air-control'
import {SQLDataType} from '@airport/ground-control'
import {
	ISQLFunctionAdaptor,
	ISQLQueryAdaptor,
	ISqlValueProvider
}                    from '@airport/fuel-hydrant-system'

/**
 * Created by Papa on 8/27/2016.
 */
export class OracleQueryAdaptor
	implements ISQLQueryAdaptor {

	constructor(protected sqlValueProvider: ISqlValueProvider) {
	}

	getParameterReference(
		parameterReferences: (number | string)[],
		newReference: number | string
	): string {
		throw new Error(`Not implemented`)
	}

	dateToDbQuery(date: Date): string {
		let dateString = date.toJSON()
		dateString     = dateString.replace('Z', '')
		return `trunc(to_timestamp_tz('${dateString}.GMT','YYYY-MM-DD"T"HH24:MI:SS.FF3.TZR'))`
	}

	getResultArray(rawResponse: any): any[] {
		throw new Error(`Not implemented - getResultArray`)
	}

	getResultCellValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any {
		throw new Error(`Not implemented - getResultCellValue`)
	}

	getFunctionAdaptor(): ISQLFunctionAdaptor {
		throw new Error(`Not implemented getFunctionAdaptor`)
	}

	getOffsetFragment(offset: number): string {
		throw new Error(`Not implemented`)
	}

	getLimitFragment(limit: number): string {
		throw new Error(`Not implemented`)
	}

	getParameterValue(parameter: Parameter): any {
		throw new Error(`Not implemented`)
	}

	getValue(value: any): any {
		throw new Error(`Not implemented`)
	}

}
