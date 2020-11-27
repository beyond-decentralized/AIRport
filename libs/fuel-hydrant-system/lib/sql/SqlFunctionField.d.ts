import { JSONClauseField } from '@airport/ground-control';
import { IOperationContext } from '@airport/tower';
import { ISqlValueProvider } from '../adaptor/SQLQueryAdaptor';
export interface ISqlFunctionField {
    getValue(sqlValueProvider: ISqlValueProvider, context: IOperationContext<any, any>): string;
}
export declare class SqlFunctionField implements ISqlFunctionField {
    jsonClauseField: JSONClauseField;
    constructor(jsonClauseField: JSONClauseField);
    getValue(sqlValueProvider: ISqlValueProvider, context: IOperationContext<any, any>): string;
}
//# sourceMappingURL=SqlFunctionField.d.ts.map