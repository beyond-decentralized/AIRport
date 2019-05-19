import { ColumnName } from '../../lingo/schema/Property';
import { DomainName, JsonSchemaName, SchemaName } from '../../lingo/schema/Schema';
export interface IDbSchemaUtils {
    getSchemaName(jsonSchema: {
        domain: DomainName;
        name: JsonSchemaName;
    }): SchemaName;
    getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
}
export declare class DbSchemaUtils implements IDbSchemaUtils {
    getSchemaName(jsonSchema: {
        domain: DomainName;
        name: JsonSchemaName;
    }): string;
    getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
}
export declare function getSchemaName({ domain, name }: {
    domain: any;
    name: any;
}): string;
