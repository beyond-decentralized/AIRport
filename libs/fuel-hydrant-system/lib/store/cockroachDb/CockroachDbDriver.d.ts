import { IAirportDatabase, IUtils } from "@airport/air-control";
import { QueryType } from "@airport/ground-control";
import { SQLDialect } from '../../sql/core/SQLQuery';
import { SqLiteDriver } from "../sqLite/SqLiteDriver";
import { ActiveQueries } from "../ActiveQueries";
/**
 * Created by Papa on 8/30/2016.
 */
export declare class CockroachdbDriver extends SqLiteDriver {
    static BACKUP_LOCAL: number;
    static BACKUP_LIBRARY: number;
    static BACKUP_DOCUMENTS: number;
    private _db;
    private currentTransaction;
    constructor(airportDb: IAirportDatabase, utils: IUtils, queries: ActiveQueries);
    protected getDialect(): SQLDialect;
    private getBackupLocation;
    initialize(dbName: string): Promise<any>;
    startTransaction(): Promise<any>;
    rollbackTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
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
