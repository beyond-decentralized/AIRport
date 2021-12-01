import { QueryType, SQLDataType } from '@airport/ground-control';
import { SqlDriver } from '@airport/fuel-hydrant-system';
import { IOperationContext } from '@airport/terminal-map';
/**
 * Created by Papa on 11/27/2016.
 */
export declare abstract class SqLiteDriver extends SqlDriver {
    constructor();
    composeTableName(applicationName: string, tableName: string): string;
    doesTableExist(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    protected getNumberOfRows(result: any): number;
    protected abstract getRows(result: any): any;
    dropTable(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext): Promise<any[]>;
    protected executeNative(sql: string, parameters: any[], context: IOperationContext): Promise<number>;
    protected convertValueIn(value: any): number | string;
    isValueValid(value: any, sqlDataType: SQLDataType, context: IOperationContext): boolean;
    abstract query(queryType: QueryType, query: string, params: any, context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
    protected getDialect(): import('@airport/fuel-hydrant-system').SQLDialect;
    isServer(): boolean;
}
//# sourceMappingURL=SqLiteDriver.d.ts.map