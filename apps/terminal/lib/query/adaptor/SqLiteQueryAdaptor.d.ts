import { IQEntityInternal, Parameter } from "@airport/air-control";
import { JSONSqlFunctionCall, SQLDataType } from "@airport/ground-control";
import { AbstractFunctionAdaptor, ISQLFunctionAdaptor, ISQLQueryAdaptor, ISqlValueProvider } from "./SQLQueryAdaptor";
/**
 * Created by Papa on 8/27/2016.
 */
export declare abstract class SqLiteQueryAdaptor implements ISQLQueryAdaptor {
    protected sqlValueProvider: ISqlValueProvider;
    private functionAdaptor;
    constructor(sqlValueProvider: ISqlValueProvider);
    getParameterReference(parameterReferences: (number | string)[], newReference: number | string): string;
    dateToDbQuery(date: Date): string;
    getResultArray(rawResponse: any): any[];
    protected abstract getResultCellRawValue(resultRow: any, columnName: string, index: number, dataType: SQLDataType, defaultValue: any): any;
    getResultCellValue(resultRow: any, columnName: string, index: number, dataType: SQLDataType, defaultValue: any): any;
    getFunctionAdaptor(): ISQLFunctionAdaptor;
    getOffsetFragment(offset: number): string;
    getLimitFragment(limit: number): string;
    getParameterValue(parameter: Parameter): any;
    getValue(value: any): any;
}
export declare class SqlLiteFunctionAdaptor extends AbstractFunctionAdaptor {
    protected sqlValueProvider: ISqlValueProvider;
    constructor(sqlValueProvider: ISqlValueProvider);
    getFunctionCall(jsonFunctionCall: JSONSqlFunctionCall, value: string, qEntityMapByAlias: {
        [entityName: string]: IQEntityInternal;
    }): string;
    toString(val: any): string;
}
