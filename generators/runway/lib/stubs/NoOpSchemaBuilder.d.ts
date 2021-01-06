import { IAirportDatabase } from '@airport/air-control';
import { IContext } from '@airport/di';
import { DbSchema, IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';
export declare class NoOpSchemaBuilder extends SqlSchemaBuilder {
    createSchema(jsonSchema: JsonSchema, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string;
    getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    buildAllSequences(jsonSchemas: JsonSchema[], context: IContext): Promise<any[]>;
    stageSequences(jsonSchemas: JsonSchema[], airDb: IAirportDatabase, context: IContext): any[];
    buildSequences(dbSchema: DbSchema, jsonEntity: JsonSchemaEntity): any[];
}
//# sourceMappingURL=NoOpSchemaBuilder.d.ts.map