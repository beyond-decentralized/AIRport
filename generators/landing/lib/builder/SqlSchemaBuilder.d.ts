import { JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { ISchemaBuilder } from './ISchemaBuilder';
export declare abstract class SqlSchemaBuilder implements ISchemaBuilder {
    constructor();
    build(jsonSchema: JsonSchema): Promise<void>;
    buildTable(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): Promise<void>;
    getProperties(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string[];
    abstract getColumnType(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, column: JsonSchemaColumn): string;
    protected getPrimaryKeySuffix(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string;
    protected isForeignKey(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): boolean;
    protected abstract getPrimaryKeyColumnSyntax(): string;
}
