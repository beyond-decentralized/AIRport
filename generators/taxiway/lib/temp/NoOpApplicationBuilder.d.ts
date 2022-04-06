import { IAirportDatabase } from '@airport/air-control';
import { IContext } from '@airport/di';
import { DbApplication, JsonApplication, JsonApplicationColumn, JsonApplicationEntity } from '@airport/ground-control';
import { SqlApplicationBuilder } from '@airport/landing';
import { IStoreDriver } from '@airport/terminal-map';
export declare class NoOpApplicationBuilder extends SqlApplicationBuilder {
    createApplication(jsonApplication: JsonApplication, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    getColumnSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity, jsonColumn: JsonApplicationColumn): string;
    getCreateTableSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity): string;
    buildAllSequences(jsonApplications: JsonApplication[], context: IContext): Promise<any[]>;
    stageSequences(jsonApplications: JsonApplication[], airDb: IAirportDatabase, context: IContext): any[];
    buildSequences(dbApplication: DbApplication, jsonEntity: JsonApplicationEntity): any[];
    protected getIndexSql(indexName: string, tableName: string, columnNameList: string[], unique: boolean): string;
    protected getForeignKeySql(tableName: string, foreignKeyName: string, foreignKeyColumnNames: string[], referencedTableName: string, referencedColumnNames: string[]): string;
}
//# sourceMappingURL=NoOpApplicationBuilder.d.ts.map