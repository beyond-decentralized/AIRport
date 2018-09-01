import { ColumnId, ColumnIndex, ColumnName, ColumnNotNull, IdColumnOnlyIndex, SchemaColumnAllocationSize, SchemaColumnIsGenerated, SQLDataType } from '@airport/ground-control';
import { ISchemaPropertyColumn } from '../../generated/schema/qschemapropertycolumn';
import { ISchemaRelationColumn } from '../../generated/schema/qschemarelationcolumn';
import { SchemaEntity } from './SchemaEntity';
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
    propertyColumns: ISchemaPropertyColumn[];
    manyRelationColumns: ISchemaRelationColumn[];
    oneRelationColumns: ISchemaRelationColumn[];
}
