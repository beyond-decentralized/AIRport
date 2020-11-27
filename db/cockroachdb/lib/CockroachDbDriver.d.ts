import { SQLDialect, SqlDriver } from '@airport/fuel-hydrant-system';
import { QueryType } from '@airport/ground-control';
import { IOperationContext, ITransaction } from '@airport/tower';
/**
 * Created by Papa on 8/30/2016.
 */
export declare class CockroachdbDriver extends SqlDriver {
    constructor();
    composeTableName(schemaName: string, tableName: string, context: IOperationContext<any, any>): string;
    initialize(dbName: string, context: IOperationContext<any, any>): Promise<any>;
    transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IOperationContext<any, any>): Promise<any>;
    query(queryType: QueryType, query: string, params: any[], context: IOperationContext<any, any>, saveTransaction?: boolean): Promise<any>;
    handleError(error: any): void;
    protected getDialect(context: IOperationContext<any, any>): SQLDialect;
}
//# sourceMappingURL=CockroachDbDriver.d.ts.map