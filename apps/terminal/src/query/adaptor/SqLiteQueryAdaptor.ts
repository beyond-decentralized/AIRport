import { IQEntityInternal, Parameter } from "@airport/air-control";
import { JSONSqlFunctionCall, SQLDataType, SqlFunction } from "@airport/ground-control";
import { AbstractFunctionAdaptor, ISQLFunctionAdaptor, ISQLQueryAdaptor, ISqlValueProvider } from "./SQLQueryAdaptor";

/**
 * Created by Papa on 8/27/2016.
 */
export abstract class SqLiteQueryAdaptor
	implements ISQLQueryAdaptor {

	private functionAdaptor: ISQLFunctionAdaptor;

	constructor(protected sqlValueProvider: ISqlValueProvider) {
		this.functionAdaptor = new SqlLiteFunctionAdaptor(sqlValueProvider);
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

	protected abstract getResultCellRawValue(
		resultRow: any,
		columnName: string,
		index: number,
		dataType: SQLDataType,
		defaultValue: any
	): any;

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
					return !!value;
				}
			case SQLDataType.DATE:
				if (value !== null) {
					return new Date(value);
				}
		}
		return value;
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

	getValue(value: any): any {
		switch (typeof value) {
			case 'boolean':
			case 'number':
			case 'string':
				return value;
			case 'object':
				if (value instanceof Date) {
					return value.getTime();
				}
				throw `Unexpected object as a parameter.`;
			default:
				throw `Unexpected type of parameter '${typeof value}.'`;
		}
	}

}

export class SqlLiteFunctionAdaptor
	extends AbstractFunctionAdaptor {

	constructor(protected sqlValueProvider: ISqlValueProvider) {
		super(sqlValueProvider);
	}

	getFunctionCall(
		jsonFunctionCall: JSONSqlFunctionCall,
		value: string,
		qEntityMapByAlias: { [entityName: string]: IQEntityInternal }
	): string {
		switch (jsonFunctionCall.ft) {
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
				let start = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0]);
				let length = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[1]);
				return `SUBSTR(${value}, ${start}, ${length})`;
			case SqlFunction.LEN:
				return `LENGTH(${value})`;
			case SqlFunction.ROUND:
				let digits = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0]);
				return `ROUND(${value}, ${digits})`;
			case SqlFunction.NOW:
				return `DATE('now')`;
			case SqlFunction.FORMAT:
				let formatCall = `FORMAT('${value}', `;
				for (let i = 0; i < jsonFunctionCall.p.length; i++) {
					let formatParam = jsonFunctionCall.p[i];
					formatParam = this.sqlValueProvider.getFunctionCallValue(formatParam);
					formatCall = `${formatCall}, ${formatParam}`;
				}
				formatCall += ')';
				return formatCall;
			case SqlFunction.REPLACE:
				let param1 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0]);
				let param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[1]);
				return `REPLACE('${value}', ${param1}, ${param2})`;
			case SqlFunction.TRIM:
				return `TRIM(${value})`;
			case SqlFunction.DISTINCT:
				throw `Invalid placement of a distinct function`;
			case SqlFunction.EXISTS:
				throw `Invalid placement of an exists function`;
			case SqlFunction.DIVIDE:
				param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0]);
				return `${value} / ${param2}`;
			case SqlFunction.MINUS:
				param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0]);
				return `${value} - ${param2}`;
			case SqlFunction.MULTIPLY:
				param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0]);
				return `${value} * ${param2}`;
			case SqlFunction.PLUS:
				param2 = this.sqlValueProvider.getFunctionCallValue(jsonFunctionCall.p[0]);
				return `${value} + ${param2}`;
			case SqlFunction.CONCATENATE:
				return jsonFunctionCall.p.reduce((
					acc,
					val
				) => {
					let primitiveValue = this.toString(this.sqlValueProvider.getFunctionCallValue(val));
					return acc + val;
				}, this.toString(value));
			default:
				throw `Unknown function type: ${jsonFunctionCall.ft}`;
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
				throw `Unsupported value for conversion to string.`;
			default:
				throw `Unsupported value for conversion to string.`;
		}
	}
}