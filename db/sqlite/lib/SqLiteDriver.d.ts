import { QueryType, SQLDataType } from '@airport/ground-control';
import { SqlDriver } from '@airport/fuel-hydrant-system';
/**
 * Created by Papa on 11/27/2016.
 */
export declare abstract class SqLiteDriver extends SqlDriver {
    constructor();
    composeTableName(schemaName: string, tableName: string): string;
    doesTableExist(schemaName: string, tableName: string): Promise<boolean>;
    dropTable(schemaName: string, tableName: string): Promise<boolean>;
    findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    protected executeNative(sql: string, parameters: any[]): Promise<number>;
    protected convertValueIn(value: any): number | string;
    isValueValid(value: any, sqlDataType: SQLDataType): boolean;
    abstract query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    initTables(createQueries: Promise<any>[]): Promise<void>;
}
//# sourceMappingURL=SqLiteDriver.d.ts.map