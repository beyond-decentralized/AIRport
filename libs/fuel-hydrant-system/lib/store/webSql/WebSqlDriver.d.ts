import { QueryType } from '@airport/ground-control';
import { SQLDialect } from '../../sql/core/SQLQuery';
import { SqLiteDriver } from '../../db/sqlite/src/SqLiteDriver';
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
    private _db;
    private currentStatementId;
    private keepAlive;
    private keepAliveCount;
    private transaction;
    private pendingStatements;
    constructor();
    protected getDialect(): SQLDialect;
    private getBackupLocation;
    initialize(dbName: string): Promise<any>;
    transact(keepAlive?: boolean): Promise<void>;
    rollback(): Promise<void>;
    commit(): Promise<void>;
    query(queryType: QueryType, query: string, params?: any[], saveTransaction?: boolean): Promise<any>;
    private keepTransactionAlive;
    private executePendingStatements;
    private getReturnValue;
}
//# sourceMappingURL=WebSqlDriver.d.ts.map