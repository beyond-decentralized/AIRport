import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { IContext } from '@airport/di';
import { IStoreDriver, JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { ISchemaBuilder } from './ISchemaBuilder';
export declare abstract class SqlSchemaBuilder implements ISchemaBuilder {
    build(jsonSchema: JsonSchema, context: IContext): Promise<void>;
    abstract createSchema(jsonSchema: JsonSchema, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    buildTable(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, storeDriver: IStoreDriver, context: IContext): Promise<void>;
    abstract buildAllSequences(jsonSchemas: JsonSchema[], context: IContext): Promise<ISequence[]>;
    abstract stageSequences(jsonSchemas: JsonSchema[], airDb: IAirportDatabase, context: IContext): ISequence[];
    abstract getColumnSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity, column: JsonSchemaColumn): string;
    abstract getCreateTableSuffix(jsonSchema: JsonSchema, jsonEntity: JsonSchemaEntity): string;
    protected isPrimaryKeyColumn(jsonEntity: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): boolean;
    protected getPrimaryKeyStatement(columnNames: string[]): string;
}
//# sourceMappingURL=SqlSchemaBuilder.d.ts.map