import type * as SQL from 'sql.js';
import { SQLDialect } from '@airport/fuel-hydrant-system';
import { QueryType } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
import { IOperationContext, ITransaction } from '@airport/terminal-map';
/**
 * Created by Papa on 11/27/2016.
 */
export declare class SqlJsDriver extends SqLiteDriver {
    _db: SQL.Database;
    constructor();
    initialize(): Promise<any>;
    transact(transactionalCallback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IOperationContext): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    query(queryType: QueryType, query: string, params: any[], context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    handleError(error: any): void;
    protected getRows(result: any): number;
    protected getDialect(): SQLDialect;
}
//# sourceMappingURL=SqlJsDriver.d.ts.map