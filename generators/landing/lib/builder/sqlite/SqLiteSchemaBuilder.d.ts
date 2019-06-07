import { ISequence } from '@airport/airport-code';
import { DbSchema, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '../SqlSchemaBuilder';
export declare class SqLiteSchemaBuilder extends SqlSchemaBuilder {
    createSchema(jsonSchema: JsonSchema): Promise<void>;
    getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string;
    getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    buildAllSequences(jsonSchemas: JsonSchema[]): Promise<ISequence[]>;
    buildSequences(dbSchema: DbSchema, jsonEntity: JsonSchemaEntity): ISequence[];
}
