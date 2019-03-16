import { ColumnName } from '../../lingo/schema/Property';
import { DomainName, JsonSchema, JsonSchemaName, SchemaName } from '../../lingo/schema/Schema';
export interface IDbSchemaUtils {
    getSchemaName(jsonSchema: JsonSchema): SchemaName;
    getSchemaNameFromDomainAndJsonSchemaNames(domainName: DomainName, jsonSchemaName: JsonSchemaName): string;
    getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
}
export declare class DbSchemaUtils implements IDbSchemaUtils {
    getSchemaName(jsonSchema: JsonSchema): string;
    getSchemaNameFromDomainAndJsonSchemaNames(domainName: DomainName, jsonSchemaName: JsonSchemaName): string;
    getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
}
