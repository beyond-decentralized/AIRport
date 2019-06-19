import {
	IAirportDatabase,
	IQMetadataUtils,
	ISchemaUtils
} from '@airport/air-control'
import { JSONClauseField }   from "@airport/ground-control";
import { ISqlValueProvider } from "../adaptor/SQLQueryAdaptor";

export interface ISqlFunctionField {

	getValue(
		sqlValueProvider: ISqlValueProvider,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string;

}

export class SqlFunctionField implements ISqlFunctionField {

	constructor(
		public jsonClauseField: JSONClauseField,
	) {
		// Test
	}

	getValue(
		sqlValueProvider: ISqlValueProvider,
		airDb: IAirportDatabase,
		schemaUtils: ISchemaUtils,
		metadataUtils: IQMetadataUtils
	): string {
		return sqlValueProvider.getFieldFunctionValue(
			this.jsonClauseField, null,
			airDb, schemaUtils, metadataUtils);
	}

}
