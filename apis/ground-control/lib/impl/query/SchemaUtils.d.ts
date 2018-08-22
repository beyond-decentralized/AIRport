import { JsonSchema } from '../../lingo/schema/Schema';
export interface ISchemaUtils {
    getSchemaName(jsonSchema: JsonSchema): string;
    getSequenceName(prefixedTableName: string, columnName: string): string;
}
export declare class SchemaUtils implements ISchemaUtils {
    getSchemaName(jsonSchema: JsonSchema): string;
    getSequenceName(prefixedTableName: string, columnName: string): string;
}
