import { IAirportDatabase } from '@airport/air-traffic-control';
import { ISequence } from '@airport/airport-code';
import { IContext } from '@airport/direction-indicator';
import { DbApplication, JsonApplication, JsonApplicationColumn, JsonApplicationEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';
export declare class PostgreApplicationBuilder extends SqlSchemaBuilder {
    airportDatabase: IAirportDatabase;
    createApplication(jsonApplication: JsonApplication, context: IContext): Promise<void>;
    getColumnSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity, jsonColumn: JsonApplicationColumn): string;
    getCreateTableSuffix(jsonApplication: JsonApplication, jsonEntity: JsonApplicationEntity): string;
    buildAllSequences(jsonApplications: JsonApplication[], context: IContext): Promise<ISequence[]>;
    stageSequences(jsonApplications: JsonApplication[], context: IContext): ISequence[];
    buildSequences(dbApplication: DbApplication, jsonEntity: JsonApplicationEntity): ISequence[];
    protected getIndexSql(indexName: string, tableName: string, columnNameList: string[], unique: boolean): string;
    protected getForeignKeySql(tableName: string, foreignKeyName: string, foreignKeyColumnNames: string[], referencedTableName: string, referencedColumnNames: string[]): string;
}
//# sourceMappingURL=PostgreSchemaBuilder.d.ts.map