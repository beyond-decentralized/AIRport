import {JSONClauseField}   from '@airport/ground-control'
import {IOperationContext} from '@airport/tower'
import {ISqlValueProvider} from '../adaptor/SQLQueryAdaptor'

export interface ISqlFunctionField {

	getValue(
		sqlValueProvider: ISqlValueProvider,
		context: IOperationContext<any, any>,
	): string;

}

export class SqlFunctionField
	implements ISqlFunctionField {

	constructor(
		public jsonClauseField: JSONClauseField,
	) {
		// Test
	}

	getValue(
		sqlValueProvider: ISqlValueProvider,
		context: IOperationContext<any, any>,
	): string {
		return sqlValueProvider.getFieldFunctionValue(
			this.jsonClauseField, null, context)
	}

}
