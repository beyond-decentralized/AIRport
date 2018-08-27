import { ISchemaColumn } from '../../generated/schema/qschemacolumn';
import { ISchemaProperty } from '../../generated/schema/qschemaproperty';
import { VersionedSchemaObject } from './VersionedSchemaObject';
/**
 * Many-to-Many between Columns and properties
 */
export declare class SchemaPropertyColumn extends VersionedSchemaObject {
    column: ISchemaColumn;
    property: ISchemaProperty;
}
