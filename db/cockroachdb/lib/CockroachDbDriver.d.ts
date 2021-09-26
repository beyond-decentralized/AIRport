import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType } from '@airport/ground-control';
import { IOperationContext, ITransaction } from '@airport/terminal-map';
/**
 * Created by Papa on 8/30/2016.
 */
export declare class CockroachdbDriver extends SqlDriver {
    constructor();
    composeTableName(schemaName: string, tableName: string, context: IOperationContext): string;
    initialize(dbName: string, context: IOperationContext): Promise<any>;
    transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IOperationContext): Promise<any>;
    query(queryType: QueryType, query: string, params: any[], context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    handleError(error: any): void;
    protected getDialect(context: IOperationContext): SQLDialect;
}
//# sourceMappingURL=CockroachDbDriver.d.ts.map