import { ISchemaColumn } from '../../generated/schema/qschemacolumn';
import { ISchemaProperty } from '../../generated/schema/qschemaproperty';
/**
 * Many-to-Many between Columns and properties
 */
export declare class SchemaPropertyColumn {
    column: ISchemaColumn;
    property: ISchemaProperty;
}
