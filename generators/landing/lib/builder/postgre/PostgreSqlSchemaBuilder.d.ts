import { ISequence } from '@airport/airport-code';
import { IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '../SqlSchemaBuilder';
export declare class PostgreSqlSchemaBuilder extends SqlSchemaBuilder {
    createSchema(jsonSchema: JsonSchema, storeDriver: IStoreDriver): Promise<void>;
    getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string;
    getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    buildAllSequences(jsonSchemas: JsonSchema[]): Promise<ISequence[]>;
    buildSequences(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, storeDriver: IStoreDriver): Promise<void>;
}
//# sourceMappingURL=PostgreSqlSchemaBuilder.d.ts.map