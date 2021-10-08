import { QueryType } from '@airport/ground-control';
import { SqLiteDriver } from '@airport/sqlite';
import { IOperationContext, ITransaction } from '@airport/terminal-map';
/**
 * Created by Papa on 8/30/2016.
 */
export interface PendingStatement {
    id: number;
    queryType: QueryType;
    query: string;
    params: any[];
    reject: (error: any) => void;
    resolve: (result: any) => void;
}
export declare class WebSqlDriver extends SqLiteDriver {
    static BACKUP_LOCAL: number;
    static BACKUP_LIBRARY: number;
    static BACKUP_DOCUMENTS: number;
    _db: any;
    constructor();
    initialize(dbName: string, context: IOperationContext): Promise<any>;
    transact(transactionalCallback: {
        (transaction: ITransaction): Promise<void>;
    }): Promise<void>;
    query(queryType: QueryType, query: string, params: any[], context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    protected doQuery(queryType: QueryType, query: string, params: any[], context: IOperationContext, tx: any, resolve: any, reject: any): void;
    protected getRows(result: any): number;
}
//# sourceMappingURL=WebSqlDriver.d.ts.map