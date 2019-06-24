import { ISequence } from '@airport/airport-code';
import { IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { ISchemaBuilder } from './ISchemaBuilder';
export declare abstract class SqlSchemaBuilder implements ISchemaBuilder {
    build(jsonSchema: JsonSchema): Promise<void>;
    abstract createSchema(jsonSchema: JsonSchema, storeDriver: IStoreDriver): Promise<void>;
    buildTable(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, storeDriver: IStoreDriver): Promise<void>;
    abstract buildAllSequences(jsonSchemas: JsonSchema[]): Promise<ISequence[]>;
    abstract getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, column: JsonSchemaColumn): string;
    abstract getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    protected isPrimaryKeyColumn(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): boolean;
    protected getPrimaryKeyStatement(columnNames: string[]): string;
}
