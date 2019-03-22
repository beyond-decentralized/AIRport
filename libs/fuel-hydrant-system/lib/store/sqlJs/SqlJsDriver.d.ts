import { QueryType } from '@airport/ground-control';
import { SQLDialect } from '../../sql/core/SQLQuery';
import { SqLiteDriver } from '../sqLite/SqLiteDriver';
export declare class SqlJsDriver extends SqLiteDriver {
    private _db;
    private currentTransaction;
    constructor();
    protected getDialect(): SQLDialect;
    initialize(): Promise<any>;
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
    query(queryType: QueryType, query: string, params?: any[], saveTransaction?: boolean): Promise<any>;
    private getReturnValue;
    handleError(error: any): void;
}
