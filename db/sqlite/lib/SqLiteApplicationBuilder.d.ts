import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { IContext } from '@airport/di';
import { DbApplication, IStoreDriver, JsonApplication, JsonApplicationColumn, JsonApplicationEntity } from '@airport/ground-control';
import { SqlApplicationBuilder } from '@airport/landing';
export declare class SqLiteApplicationBuilder extends SqlApplicationBuilder {
    createApplication(jsonApplication: JsonApplication, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    getColumnSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity, jsonColumn: JsonApplicationColumn): string;
    getCreateTableSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity): string;
    buildAllSequences(jsonApplications: JsonApplication[]): Promise<ISequence[]>;
    stageSequences(jsonApplications: JsonApplication[], airDb: IAirportDatabase): ISequence[];
    buildSequences(dbApplication: DbApplication, jsonEntity: JsonApplicationEntity): ISequence[];
    protected getIndexSql(indexName: string, tableName: string, columnNameList: string[], unique: boolean): string;
    protected getForeignKeySql(tableName: string, foreignKeyName: string, foreignKeyColumnNames: string[], referencedTableName: string, referencedColumnNames: string[]): string;
}
//# sourceMappingURL=SqLiteApplicationBuilder.d.ts.map