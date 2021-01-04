import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { IContext } from '@airport/di';
import { DbSchema, IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { SqlSchemaBuilder } from '@airport/landing';
export declare class MySqlSchemaBuilder extends SqlSchemaBuilder {
    createSchema(jsonSchema: JsonSchema, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string;
    getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    buildAllSequences(jsonSchemas: JsonSchema[], context: IContext): Promise<ISequence[]>;
    stageSequences(jsonSchemas: JsonSchema[], airDb: IAirportDatabase, context: IContext): ISequence[];
    buildSequences(dbSchema: DbSchema, jsonEntity: JsonSchemaEntity): ISequence[];
}
//# sourceMappingURL=MySqlSchemaBuilder.d.ts.map