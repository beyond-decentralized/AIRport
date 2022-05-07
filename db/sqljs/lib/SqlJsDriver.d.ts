import type * as SQL from 'sql.js';
import { SQLDialect } from '@airport/fuel-hydrant-system';
import { QueryType } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
import { IOperationContext, ITransaction, ITransactionContext } from '@airport/terminal-map';
/**
 * Created by Papa on 11/27/2016.
 */
export declare class SqlJsDriver extends SqLiteDriver {
    _db: SQL.Database;
    constructor();
    initialize(): Promise<any>;
    setupTransaction(context: ITransactionContext, parentTransaction?: ITransaction): Promise<ITransaction>;
    internalStartTransaction(transaction: ITransaction, context?: ITransactionContext): Promise<void>;
    internalCommit(transaction: ITransaction, context?: ITransactionContext): Promise<void>;
    internalRollback(transaction: ITransaction, context?: ITransactionContext): Promise<void>;
    query(queryType: QueryType, query: string, params: any[], context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    handleError(error: any): void;
    protected getRows(result: any): number;
    private wait;
    private getReturnValue;
    protected getDialect(): SQLDialect;
}
//# sourceMappingURL=SqlJsDriver.d.ts.map