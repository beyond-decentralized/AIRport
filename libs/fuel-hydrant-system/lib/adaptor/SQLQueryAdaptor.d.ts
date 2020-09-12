import { IAirportDatabase, IQEntityInternal, IQMetadataUtils, ISchemaUtils, Parameter } from '@airport/air-control';
import { JSONClauseField, JSONClauseObject, JSONSqlFunctionCall, SQLDataType } from '@airport/ground-control';
import { SQLDialect } from '../sql/core/SQLQuery';
/**
 * Created by Papa on 8/27/2016.
 */
export interface ISQLQueryAdaptor {
    getParameterReference(parameterReferences: (number | string)[], newReference: number | string): string;
    dateToDbQuery(date: Date): string;
    getResultArray(rawResponse: any): any[];
    /**
     * Options in returned result:
     *
     * Object mapped by ?column? name
     * Array of values
     *
     * This is a common API on top of both
     */
    getResultCellValue(resultRow: any, columnName: string, index: number, dataType: SQLDataType, defaultValue: any): any;
    getFunctionAdaptor(): ISQLFunctionAdaptor;
    getOffsetFragment(offset: number): string;
    getLimitFragment(limit: number): string;
    getParameterValue(parameter: Parameter): any;
    getValue(value: any): any;
}
export interface ISqlValueProvider {
    getFunctionCallValue(rawValue: any, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    getFieldFunctionValue(aField: JSONClauseField, defaultCallback: () => string, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
}
export interface ISQLFunctionAdaptor {
    getFunctionCalls(clause: JSONClauseObject, innerValue: string, qEntityMapByAlias: {
        [alias: string]: IQEntityInternal;
    }, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    getFunctionCall(jsonFunctionCall: JSONSqlFunctionCall, value: string, qEntityMapByAlias: {
        [entityName: string]: IQEntityInternal;
    }, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
}
export declare function getSQLAdaptor(sqlValueProvider: ISqlValueProvider, sqlDialect: SQLDialect): ISQLQueryAdaptor;
export declare abstract class AbstractFunctionAdaptor implements ISQLFunctionAdaptor {
    protected sqlValueProvider: ISqlValueProvider;
    constructor(sqlValueProvider: ISqlValueProvider);
    getFunctionCalls(clause: JSONClauseObject, innerValue: string, qEntityMapByAlias: {
        [alias: string]: IQEntityInternal;
    }, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
    abstract getFunctionCall(jsonFunctionCall: JSONSqlFunctionCall, value: string, qEntityMapByAlias: {
        [entityName: string]: IQEntityInternal;
    }, airDb: IAirportDatabase, schemaUtils: ISchemaUtils, metadataUtils: IQMetadataUtils): string;
}
//# sourceMappingURL=SQLQueryAdaptor.d.ts.map