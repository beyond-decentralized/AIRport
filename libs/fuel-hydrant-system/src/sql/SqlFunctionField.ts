import { QueryFieldClause } from '@airport/ground-control'
import { ISqlValueProvider } from '../adaptor/SQLQueryAdaptor'
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
		public queryFieldClause: QueryFieldClause,
	) {
		// Test
	}

	getValue(
		sqlValueProvider: ISqlValueProvider,
		context: IFuelHydrantContext,
	): string {
		return sqlValueProvider.getFieldFunctionValue(
			this.queryFieldClause, null, context)
	}

}
