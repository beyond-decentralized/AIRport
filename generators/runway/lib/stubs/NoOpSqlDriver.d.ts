import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { IOperationContext, ITransaction } from '@airport/tower';
export declare class NoOpSqlDriver extends SqlDriver {
    composeTableName(schemaName: string, tableName: string, context: IOperationContext<any, any>): string;
    doesTableExist(schemaName: string, tableName: string, context: IOperationContext<any, any>): Promise<boolean>;
    dropTable(schemaName: string, tableName: string, context: IOperationContext<any, any>): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext<any, any>): Promise<any[]>;
    initialize(dbName: string, context: IOperationContext<any, any>): Promise<any>;
    isServer(context: IOperationContext<any, any>): boolean;
    isValueValid(value: any, sqlDataType: any, context: IOperationContext<any, any>): boolean;
    query(queryType: any, query: string, params: any, context: IOperationContext<any, any>, saveTransaction?: boolean): Promise<any>;
    transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IOperationContext<any, any>): Promise<void>;
    protected executeNative(sql: string, parameters: any[], context: IOperationContext<any, any>): Promise<number>;
    protected getDialect(context: IOperationContext<any, any>): SQLDialect;
}
//# sourceMappingURL=NoOpSqlDriver.d.ts.map