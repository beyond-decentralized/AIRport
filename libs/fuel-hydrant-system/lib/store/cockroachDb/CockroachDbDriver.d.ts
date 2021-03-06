import { QueryType } from '@airport/ground-control';
import { SQLDialect } from '../../sql/core/SQLQuery';
import { SqLiteDriver } from '../../db/sqlite/src/SqLiteDriver';
/**
 * Created by Papa on 8/30/2016.
 */
export declare class CockroachdbDriver extends SqLiteDriver {
    static BACKUP_LOCAL: number;
    static BACKUP_LIBRARY: number;
    static BACKUP_DOCUMENTS: number;
    private _db;
    private currentTransaction;
    constructor();
    protected getDialect(): SQLDialect;
    private getBackupLocation;
    initialize(dbName: string): Promise<any>;
    transact(): Promise<any>;
    rollback(): Promise<void>;
    commit(): Promise<void>;
    keepTransactionAlive(tx: any): void;
    havePendingStatements(): boolean;
    executePendingStatements(tx: any): void;
    isTransactionDone(): boolean;
    getExecutedResult(id: number): any;
    currentStatementId: number;
    pendingStatements: any[];
    executedResults: any[];
    private getResponse;
    query(queryType: QueryType, query: string, params?: any[], saveTransaction?: boolean): Promise<any>;
    private getReturnValue;
    handleError(error: any): void;
}
//# sourceMappingURL=CockroachDbDriver.d.ts.map