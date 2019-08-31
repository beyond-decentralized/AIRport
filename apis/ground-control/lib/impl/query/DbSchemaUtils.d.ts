import { ColumnName } from '../../lingo/schema/Property';
import { DomainName, SchemaName } from '../../lingo/schema/Schema';
import { SchemaStatus } from '../../lingo/schema/SchemaStatus';
export declare function getSchemaName({ domain, name }: {
    domain: any;
    name: any;
}): string;
export declare function getTableName(schema: {
    domain: DomainName | {
        name: DomainName;
    };
    name: SchemaName;
    status?: SchemaStatus;
}, table: {
    name: string;
    tableConfig?: {
        name?: string;
    };
}): string;
export declare function getSequenceName(prefixedTableName: string, columnName: ColumnName): string;
