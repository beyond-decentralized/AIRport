import { JSONClauseField } from '@airport/ground-control';
import { ISqlValueProvider } from '../adaptor/SQLQueryAdaptor';
import { IFuelHydrantContext } from '../FuelHydrantContext';
export interface ISqlFunctionField {
    getValue(sqlValueProvider: ISqlValueProvider, context: IFuelHydrantContext): string;
}
export declare class SqlFunctionField implements ISqlFunctionField {
    jsonClauseField: JSONClauseField;
    constructor(jsonClauseField: JSONClauseField);
    getValue(sqlValueProvider: ISqlValueProvider, context: IFuelHydrantContext): string;
}
//# sourceMappingURL=SqlFunctionField.d.ts.map