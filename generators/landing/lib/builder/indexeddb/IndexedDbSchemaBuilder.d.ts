import { JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { ISchemaBuilder } from '../ISchemaBuilder';
export declare class IndexedDbSchemaBuilder implements ISchemaBuilder {
    build(jsonSchema: JsonSchema): Promise<void>;
    buildTable(jsonTable: JsonSchemaEntity): Promise<void>;
    getProperties(jsonColumn: JsonSchemaColumn): string[];
    getColumnType(column: JsonSchemaColumn): string;
}
