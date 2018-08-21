import { JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '../SqlSchemaBuilder';
export declare class SqLiteSchemaBuilder extends SqlSchemaBuilder {
    constructor();
    getColumnType(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string;
    protected getPrimaryKeyColumnSyntax(): string;
}
