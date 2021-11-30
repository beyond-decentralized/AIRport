import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { IContext } from '@airport/di';
import { IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { JsonSchemaWithLastIds } from '@airport/security-check';
import { ISchema } from '@airport/airspace';
import { ISchemaBuilder } from './ISchemaBuilder';
export declare abstract class SqlSchemaBuilder implements ISchemaBuilder {
    build(jsonSchema: JsonSchema, existingSchemaMap: Map<string, ISchema>, newJsonSchemaMap: Map<string, JsonSchemaWithLastIds>, context: IContext): Promise<void>;
    abstract createSchema(jsonSchema: JsonSchema, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    buildTable(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, existingSchemaMap: Map<string, ISchema>, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    buildForeignKeys(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, existingSchemaMap: Map<string, ISchema>, newJsonSchemaMap: Map<string, JsonSchemaWithLastIds>, relatedJsonSchemaMap: Map<string, JsonSchema>, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    buildForeignKeysForTable(): Promise<void>;
    protected abstract getIndexSql(indexName: string, tableName: string, columnNameList: string[], unique: boolean): string;
    protected abstract getForeignKeySql(tableName: string, foreignKeyName: string, foreignKeyColumnNames: string[], referencedTableName: string, referencedColumnNames: string[]): string;
    abstract buildAllSequences(jsonSchemas: JsonSchema[], context: IContext): Promise<ISequence[]>;
    abstract stageSequences(jsonSchemas: JsonSchema[], airDb: IAirportDatabase, context: IContext): ISequence[];
    abstract getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, column: JsonSchemaColumn): string;
    abstract getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    protected isPrimaryKeyColumn(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): boolean;
    protected getPrimaryKeyStatement(columnNames: string[]): string;
}
//# sourceMappingURL=SqlSchemaBuilder.d.ts.map