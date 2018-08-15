import { JSONClauseField }   from "../../../../apis/ground-control/lib/index";
import { ISqlValueProvider } from "../adaptor/SQLQueryAdaptor";

export interface ISqlFunctionField {

	getValue(
		sqlValueProvider: ISqlValueProvider
	): string;

}

export class SqlFunctionField implements ISqlFunctionField {

	constructor(
		public jsonClauseField: JSONClauseField,
	) {
		// Test
	}

	getValue(
		sqlValueProvider: ISqlValueProvider
	): string {
		return sqlValueProvider.getFieldFunctionValue(this.jsonClauseField);
	}

}