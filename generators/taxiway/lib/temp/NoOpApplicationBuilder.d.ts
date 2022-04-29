import { IContext } from '@airport/direction-indicator';
import { DbApplication, JsonApplication, JsonApplicationColumn, JsonApplicationEntity } from '@airport/ground-control';
import { SqlApplicationBuilder } from '@airport/landing';
export declare class NoOpApplicationBuilder extends SqlApplicationBuilder {
    createApplication(jsonApplication: JsonApplication, context: IContext): Promise<void>;
    getColumnSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity, jsonColumn: JsonApplicationColumn): string;
    getCreateTableSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity): string;
    buildAllSequences(jsonApplications: JsonApplication[], context: IContext): Promise<any[]>;
    stageSequences(jsonApplications: JsonApplication[], context: IContext): any[];
    buildSequences(dbApplication: DbApplication, jsonEntity: JsonApplicationEntity): any[];
    protected getIndexSql(indexName: string, tableName: string, columnNameList: string[], unique: boolean): string;
    protected getForeignKeySql(tableName: string, foreignKeyName: string, foreignKeyColumnNames: string[], referencedTableName: string, referencedColumnNames: string[]): string;
}
//# sourceMappingURL=NoOpApplicationBuilder.d.ts.map