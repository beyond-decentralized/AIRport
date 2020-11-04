import { Parameter } from '@airport/air-control';
import { SQLDataType } from '@airport/ground-control';
import { ISQLFunctionAdaptor, ISQLQueryAdaptor, ISqlValueProvider } from '@airport/fuel-hydrant-system';
/**
 * Created by Papa on 8/27/2016.
 */
export declare class OracleQueryAdaptor implements ISQLQueryAdaptor {
    protected sqlValueProvider: ISqlValueProvider;
    constructor(sqlValueProvider: ISqlValueProvider);
    getParameterReference(parameterReferences: (number | string)[], newReference: number | string): string;
    dateToDbQuery(date: Date): string;
    getResultArray(rawResponse: any): any[];
    getResultCellValue(resultRow: any, columnName: string, index: number, dataType: SQLDataType, defaultValue: any): any;
    getFunctionAdaptor(): ISQLFunctionAdaptor;
    getOffsetFragment(offset: number): string;
    getLimitFragment(limit: number): string;
    getParameterValue(parameter: Parameter): any;
    getValue(value: any): any;
}
//# sourceMappingURL=OracleQueryAdaptor.d.ts.map