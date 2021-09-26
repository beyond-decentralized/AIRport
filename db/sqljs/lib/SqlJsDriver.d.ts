import { SQLDialect } from '@airport/fuel-hydrant-system';
import { QueryType } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
import { IOperationContext, ITransaction } from '@airport/terminal-map';
export declare class SqlJsDriver extends SqLiteDriver {
    private _db;
    private currentTransaction;
    constructor();
    isServer(context: IOperationContext): boolean;
    initialize(): Promise<any>;
    transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IOperationContext): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    query(queryType: QueryType, query: string, params: any[], context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    handleError(error: any): void;
    protected getDialect(): SQLDialect;
    private getReturnValue;
}
//# sourceMappingURL=SqlJsDriver.d.ts.map