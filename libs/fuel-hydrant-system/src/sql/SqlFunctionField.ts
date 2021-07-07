import {JSONClauseField}   from '@airport/ground-control'
import {ISqlValueProvider} from '../adaptor/SQLQueryAdaptor'
import { IFuelHydrantContext } from '../FuelHydrantContext'

export interface ISqlFunctionField {

	getValue(
		sqlValueProvider: ISqlValueProvider,
		context: IFuelHydrantContext,
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
		context: IFuelHydrantContext,
	): string {
		return sqlValueProvider.getFieldFunctionValue(
			this.jsonClauseField, null, context)
	}

}
