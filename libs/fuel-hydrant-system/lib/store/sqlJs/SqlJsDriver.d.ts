import { QueryType } from '@airport/ground-control';
import { SQLDialect } from '../../sql/core/SQLQuery';
import { SqLiteDriver } from '../sqLite/SqLiteDriver';
export declare class SqlJsDriver extends SqLiteDriver {
    private _db;
    private currentTransaction;
    constructor();
    protected getDialect(): SQLDialect;
    initialize(): Promise<any>;
    transact(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    query(queryType: QueryType, query: string, params?: any[], saveTransaction?: boolean): Promise<any>;
    private getReturnValue;
    handleError(error: any): void;
}
//# sourceMappingURL=SqlJsDriver.d.ts.map