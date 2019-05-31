import { IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { ISchemaBuilder } from './ISchemaBuilder';
export declare abstract class SqlSchemaBuilder implements ISchemaBuilder {
    protected storeDriver: IStoreDriver;
    constructor();
    build(jsonSchema: JsonSchema): Promise<void>;
    abstract createSchema(jsonSchema: JsonSchema): Promise<void>;
    buildTable(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): Promise<void>;
    abstract getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, column: JsonSchemaColumn): string;
    abstract getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    abstract buildSequences(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): Promise<void>;
    protected isPrimaryKeyColumn(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): boolean;
    protected getPrimaryKeyStatement(columnNames: string[]): string;
}
