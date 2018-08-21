import { IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { ISchemaBuilder } from './ISchemaBuilder';
export declare abstract class SqlSchemaBuilder implements ISchemaBuilder {
    protected storeDriver: IStoreDriver;
    constructor(storeDriver: IStoreDriver);
    build(jsonSchema: JsonSchema): Promise<void>;
    abstract createSchema(jsonSchema: JsonSchema): Promise<void>;
    getSchemaName(jsonSchema: JsonSchema): string;
    buildTable(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): Promise<void>;
    getProperties(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string[];
    abstract getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, column: JsonSchemaColumn): string;
    abstract getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    protected isPrimaryKeyColumn(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): boolean;
    abstract getTableName(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    protected getPrimaryKeyStatement(columnNames: string[]): string;
}
