import { ISchemaUtils, IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '../SqlSchemaBuilder';
export declare class SqLiteSchemaBuilder extends SqlSchemaBuilder {
    constructor(schemaUtils: ISchemaUtils, storeDriver: IStoreDriver);
    createSchema(jsonSchema: JsonSchema): Promise<void>;
    getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string;
    getTableName(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    buildSequences(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): Promise<void>;
}
