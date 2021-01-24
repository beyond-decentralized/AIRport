import { SQLDialect } from '@airport/fuel-hydrant-system';
import { QueryType } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
import { IOperationContext, ITransaction } from '@airport/tower';
export declare class SqlJsDriver extends SqLiteDriver {
    private _db;
    private currentTransaction;
    constructor();
    isServer(context: IOperationContext<any, any>): boolean;
    initialize(): Promise<any>;
    transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IOperationContext<any, any>): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    query(queryType: QueryType, query: string, params?: any[], saveTransaction?: boolean): Promise<any>;
    handleError(error: any): void;
    protected getDialect(): SQLDialect;
    private getReturnValue;
}
//# sourceMappingURL=SqlJsDriver.d.ts.map