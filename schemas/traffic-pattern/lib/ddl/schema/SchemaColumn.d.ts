import { ColumnIndex, ColumnName, IdColumnOnlyIndex, SchemaColumnAllocationSize, SchemaColumnIsGenerated, SQLDataType } from '@airport/ground-control';
import { ISchemaPropertyColumn } from '../../generated/schema/qschemapropertycolumn';
import { ISchemaRelationColumn } from '../../generated/schema/qschemarelationcolumn';
import { SchemaEntity } from './SchemaEntity';
import { VersionedSchemaObject } from './VersionedSchemaObject';
export declare type SchemaColumnId = number;
export declare class SchemaColumn extends VersionedSchemaObject {
    id: SchemaColumnId;
    /**
     * Overall column index (within the entity).
     */
    index: ColumnIndex;
    entity: SchemaEntity;
    propertyColumns: ISchemaPropertyColumn[];
    /**
     * Index of the ID (within the entity)
     */
    idIndex: IdColumnOnlyIndex;
    isGenerated: SchemaColumnIsGenerated;
    allocationSize: SchemaColumnAllocationSize;
    name: ColumnName;
    manyRelationColumns: ISchemaRelationColumn[];
    oneRelationColumns: ISchemaRelationColumn[];
    type: SQLDataType;
}
