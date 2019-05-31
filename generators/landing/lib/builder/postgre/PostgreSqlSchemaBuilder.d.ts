import { JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '../SqlSchemaBuilder';
export declare class PostgreSqlSchemaBuilder extends SqlSchemaBuilder {
    createSchema(jsonSchema: JsonSchema): Promise<void>;
    getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string;
    getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    buildSequences(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): Promise<void>;
}
