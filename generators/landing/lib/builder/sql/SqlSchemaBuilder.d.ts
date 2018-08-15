import { JsonSchema, JsonSchemaColumn, JsonSchemaEntity } from '@airport/ground-control';
import { ISchemaBuilder } from '../ISchemaBuilder';
export declare class SqlSchemaBuilder implements ISchemaBuilder {
    constructor();
    build(jsonSchema: JsonSchema): Promise<void>;
    buildTable(jsonTable: JsonSchemaEntity): Promise<void>;
    getProperties(jsonTable: JsonSchemaEntity, jsonColumn: JsonSchemaColumn): string[];
    getColumnType(column: JsonSchemaColumn): string;
}
