import { ColumnName } from '../..';
import { JsonSchema, SchemaName } from '../../lingo/schema/Schema';
export interface ISchemaUtils {
    getSchemaName(jsonSchema: JsonSchema): SchemaName;
    getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
}
export declare class SchemaUtils implements ISchemaUtils {
    getSchemaName(jsonSchema: JsonSchema): string;
    getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
}
