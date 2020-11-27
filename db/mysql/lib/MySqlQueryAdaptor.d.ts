import { IQEntityInternal, Parameter } from '@airport/air-control';
import { JSONSqlFunctionCall, SQLDataType } from '@airport/ground-control';
import { AbstractFunctionAdaptor, ISQLFunctionAdaptor, ISQLQueryAdaptor, ISqlValueProvider } from '@airport/fuel-hydrant-system';
import { IOperationContext } from '@airport/tower';
/**
 * Created by Papa on 8/27/2016.
 */
export declare class MySqlQueryAdaptor implements ISQLQueryAdaptor {
    private functionAdaptor;
    constructor();
    getParameterReference(parameterReferences: (number | string)[], newReference: number | string): string;
    dateToDbQuery(date: Date): string;
    getResultArray(rawResponse: any): any[];
    protected getResultCellRawValue(resultRow: any, columnName: string, index: number, dataType: SQLDataType, defaultValue: any): any;
    getResultCellValue(resultRow: any, columnName: string, index: number, dataType: SQLDataType, defaultValue: any): any;
    getFunctionAdaptor(): ISQLFunctionAdaptor;
    getOffsetFragment(offset: number): string;
    getLimitFragment(limit: number): string;
    getParameterValue(parameter: Parameter): any;
    getValue(value: any): any;
}
export declare class MySqlFunctionAdaptor extends AbstractFunctionAdaptor {
    getFunctionCall(jsonFunctionCall: JSONSqlFunctionCall, value: string, qEntityMapByAlias: {
        [entityName: string]: IQEntityInternal;
    }, sqlValueProvider: ISqlValueProvider, context: IOperationContext<any, any>): string;
    toString(val: any): string;
}
//# sourceMappingURL=MySqlQueryAdaptor.d.ts.map