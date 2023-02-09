import {
	AbstractFunctionAdaptor,
	ISQLFunctionAdaptor,
	ISQLQueryAdaptor,
	ISqlValueProvider
} from '@airport/fuel-hydrant-system';
import {
	QueryFunctionCall,
	SQLDataType,
	SqlFunction
} from '@airport/ground-control';
import {
	IQEntityInternal, Parameter
} from '@airport/tarmaq-query'
import { IOperationContext } from '@airport/terminal-map';

/**
 * Created by Papa on 8/27/2016.
 */
export abstract class SqLiteQueryAdaptor
	implements ISQLQueryAdaptor {

	private functionAdaptor: ISQLFunctionAdaptor;

	constructor() {
		this.functionAdaptor = new SqlLiteFunctionAdaptor();
	}

	getParameterReference(
		parameterReferences: (number | string)[],
		newReference: number | string
	): string {
		return '?';
	}

	dateToDbQuery(date: Date): string {
		let milliseconds = date.getTime();

		return '' + milliseconds;
	}

	getResultArray(rawResponse: any): any[] {
		return rawResponse.res.rows;
	}

	getResultCellValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any {
		let value = this.getResultCellRawValue(resultRow, columnName, index, dataType, defaultValue);
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
					return JSON.parse(value);
				}
				break;
			case SQLDataType.ANY:
			case SQLDataType.NUMBER:
			case SQLDataType.STRING:
				return value
			default:
				throw new Error(`Unexpected data type for column ${columnName}`)
		}
	}

	getFunctionAdaptor(): ISQLFunctionAdaptor {
		return this.functionAdaptor;
	}

	getOffsetFragment(offset: number): string {
		return `
OFFSET
	${offset}`;
	}

	getLimitFragment(limit: number): string {
		return `
LIMIT
	${limit}`;
	}

	getParameterValue(parameter: Parameter): any {
		return this.getValue(parameter.value);
	}

	getValue(
		value: any,
		allowArrays: boolean = true
	): any {
		switch (typeof value) {
			case 'boolean':
				return value ? '1' : '0';
			case 'number':
			case 'string':
				return value;
			case 'object':
				if (value instanceof Date) {
					return value.getTime();
				} else if (value instanceof Array) {
					return value.map(aValue => this.getValue(aValue, false));
				}
				throw new Error(`Unexpected object as a parameter.`);
			default:
				throw new Error(`Unexpected type of parameter '${typeof value}.'`);
		}
	}

	protected abstract getResultCellRawValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any;

}

export class SqlLiteFunctionAdaptor
	extends AbstractFunctionAdaptor {

	getFunctionCall(
		queryFunctionCall: QueryFunctionCall,
		value: string,
		qEntityMapByAlias: { [entityName: string]: IQEntityInternal },
		sqlValueProvider: ISqlValueProvider,
		context: IOperationContext,
	): string {
		let param2;
		switch (queryFunctionCall.functionType) {
			case SqlFunction.ABS:
				return `ABS(${value})`;
			case SqlFunction.AVG:
				return `AVG(${value})`;
			case SqlFunction.COUNT:
				return `COUNT(${value})`;
			case SqlFunction.MAX:
				return `MAX(${value})`;
			case SqlFunction.MIN:
				return `MIN(${value})`;
			case SqlFunction.SUM:
				return `SUM(${value})`;
			case SqlFunction.UCASE:
				return `UPPER(${value})`;
			case SqlFunction.LCASE:
				return `LOWER(${value})`;
			case SqlFunction.MID:
				let start = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[0], false, context);
				let length = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[1], false, context);
				return `SUBSTR(${value}, ${start}, ${length})`;
			case SqlFunction.LEN:
				return `LENGTH(${value})`;
			case SqlFunction.ROUND:
				let digits = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[0], false, context);
				return `ROUND(${value}, ${digits})`;
			case SqlFunction.NOW:
				return `DATE('now')`;
			case SqlFunction.FORMAT:
				let formatCall = `FORMAT('${value}', `;
				for (let i = 0; i < queryFunctionCall.functionParameters.length; i++) {
					let formatParam = queryFunctionCall.functionParameters[i];
					formatParam = sqlValueProvider.getFunctionCallValue(
						formatParam, false, context);
					formatCall = `${formatCall}, ${formatParam}`;
				}
				formatCall += ')';
				return formatCall;
			case SqlFunction.REPLACE:
				let param1 = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[0], false, context);
				param2 = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[1], false, context);
				return `REPLACE('${value}', ${param1}, ${param2})`;
			case SqlFunction.TRIM:
				return `TRIM(${value})`;
			case SqlFunction.DISTINCT:
				throw new Error(`Invalid placement of a distinct function`);
			case SqlFunction.EXISTS:
				throw new Error(`Invalid placement of an exists function`);
			case SqlFunction.DIVIDE:
				param2 = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[0], false, context);
				return `${value} / ${param2}`;
			case SqlFunction.MINUS:
				param2 = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[0], false, context);
				return `${value} - ${param2}`;
			case SqlFunction.MULTIPLY:
				param2 = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[0], false, context);
				return `${value} * ${param2}`;
			case SqlFunction.PLUS:
				param2 = sqlValueProvider.getFunctionCallValue(
					queryFunctionCall.functionParameters[0], false, context);
				return `${value} + ${param2}`;
			case SqlFunction.CONCATENATE:
				return queryFunctionCall.functionParameters.reduce((
					acc,
					val
				) => {
					let primitiveValue = this.toString(
						sqlValueProvider.getFunctionCallValue(
							val, false, context));
					return acc + val;
				}, this.toString(value));
			case SqlFunction.COALESCE:
				throw new Error('Not Implemented');
			default:
				throw new Error(`Unknown function type: ${queryFunctionCall.functionType}`);
		}
	}

	toString(val): string {
		switch (typeof val) {
			case 'string':
				return val;
			case 'boolean':
			case 'number':
				return val.toString();
			case 'undefined':
				return 'null';
			case 'object':
				if (val === null) {
					return 'null';
				}
				if (val instanceof Date) {
					return val.toJSON();
				}
				throw new Error(`Unsupported value for conversion to string.`);
			default:
				throw new Error(`Unsupported value for conversion to string.`);
		}
	}
}
