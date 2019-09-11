import { JSONClauseField } from "@airport/ground-control";
import { ISqlValueProvider } from "../adaptor/SQLQueryAdaptor";
export interface ISqlFunctionField {
    getValue(sqlValueProvider: ISqlValueProvider): string;
}
export declare class SqlFunctionField implements ISqlFunctionField {
    jsonClauseField: JSONClauseField;
    constructor(jsonClauseField: JSONClauseField);
    getValue(sqlValueProvider: ISqlValueProvider): string;
}
