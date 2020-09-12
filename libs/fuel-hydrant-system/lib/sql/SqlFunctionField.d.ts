import { IAirportDatabase, IQMetadataUtils, ISchemaUtils } from '@airport/air-control';
import { JSONClauseField } from "@airport/ground-control";
import { ISqlValueProvider } from "../adaptor/SQLQueryAdaptor";
export interface ISqlFunctionField {
    getValue(sqlValueProvider: ISqlValueProvider, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
}
export declare class SqlFunctionField implements ISqlFunctionField {
    jsonClauseField: JSONClauseField;
    constructor(jsonClauseField: JSONClauseField);
    getValue(sqlValueProvider: ISqlValueProvider, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
}
//# sourceMappingURL=SqlFunctionField.d.ts.map