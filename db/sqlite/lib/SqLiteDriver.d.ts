import { QueryType, SQLDataType } from '@airport/ground-control';
import { SqlDriver } from '@airport/fuel-hydrant-system';
import { IOperationContext } from '@airport/tower';
/**
 * Created by Papa on 11/27/2016.
 */
export declare abstract class SqLiteDriver extends SqlDriver {
    constructor();
    composeTableName(schemaName: string, tableName: string): string;
    doesTableExist(schemaName: string, tableName: string, context: IOperationContext<any, any>): Promise<boolean>;
    dropTable(schemaName: string, tableName: string, context: IOperationContext<any, any>): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext<any, any>): Promise<any[]>;
    protected executeNative(sql: string, parameters: any[], context: IOperationContext<any, any>): Promise<number>;
    protected convertValueIn(value: any): number | string;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
    abstract query(queryType: QueryType, query: string, params: any, context: IOperationContext<any, any>, saveTransaction?: boolean): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
    protected getDialect(): import('@airport/fuel-hydrant-system').SQLDialect;
    isServer(): boolean;
}
//# sourceMappingURL=SqLiteDriver.d.ts.map