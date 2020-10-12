import { QueryType } from '@airport/ground-control';
import { SqlDriver } from '@airport/fuel-hydrant-system';
/**
 * Created by Papa on 11/27/2016.
 */
export declare abstract class PostgreSqlDriver extends SqlDriver {
    doesTableExist(schemaName: string, tableName: string): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    protected executeNative(sql: string, parameters: any[]): Promise<number>;
    protected convertValueIn(value: any): number | string;
    abstract query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    initAllTables(): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
}
//# sourceMappingURL=PostgreSqlDriver.d.ts.map