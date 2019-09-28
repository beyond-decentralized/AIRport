import { ColumnId, ColumnIndex, ColumnName, ColumnNotNull, IdColumnOnlyIndex, SchemaColumnAllocationSize, SchemaColumnIsGenerated, SQLDataType } from '@airport/ground-control';
import { SchemaEntity } from './SchemaEntity';
import { SchemaPropertyColumn } from './SchemaPropertyColumn';
import { SchemaRelationColumn } from './SchemaRelationColumn';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare class SchemaColumn extends VersionedSchemaObject {
    id: ColumnId;
    /**
     * Overall column index (within the entity).
     */
    index: ColumnIndex;
    entity: SchemaEntity;
    /**
     * Index of the ID (within the entity)
     */
    idIndex?: IdColumnOnlyIndex;
    isGenerated: SchemaColumnIsGenerated;
    allocationSize?: SchemaColumnAllocationSize;
    name: ColumnName;
    notNull: ColumnNotNull;
    type: SQLDataType;
    propertyColumns: SchemaPropertyColumn[];
    manyRelationColumns: SchemaRelationColumn[];
    oneRelationColumns: SchemaRelationColumn[];
}
