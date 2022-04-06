import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { IOperationContext, ITransaction } from '@airport/terminal-map';
export declare class NoOpSqlDriver extends SqlDriver {
    composeTableName(applicationName: string, tableName: string, context: IOperationContext): string;
    doesTableExist(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    dropTable(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext): Promise<any[]>;
    initialize(dbName: string, context: IOperationContext): Promise<any>;
    isServer(context: IOperationContext): boolean;
    isValueValid(value: any, sqlDataType: any, context: IOperationContext): boolean;
    query(queryType: any, query: string, params: any, context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IOperationContext, parentTransaction?: ITransaction): Promise<void>;
    startTransaction(): Promise<ITransaction>;
    protected executeNative(sql: string, parameters: any[], context: IOperationContext): Promise<number>;
    protected getDialect(context: IOperationContext): SQLDialect;
}
//# sourceMappingURL=NoOpSqlDriver.d.ts.map