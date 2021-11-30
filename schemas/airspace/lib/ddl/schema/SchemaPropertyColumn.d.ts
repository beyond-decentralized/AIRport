import { SchemaColumn } from './SchemaColumn';
import { SchemaProperty } from './SchemaProperty';
import { VersionedSchemaObject } from './VersionedSchemaObject';
/**
 * Many-to-Many between Columns and properties
 */
export declare class SchemaPropertyColumn extends VersionedSchemaObject {
    column: SchemaColumn;
    property: SchemaProperty;
}
//# sourceMappingURL=SchemaPropertyColumn.d.ts.map