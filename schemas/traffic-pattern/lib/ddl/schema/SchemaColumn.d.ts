import { ColumnIndex, ColumnName, IdColumnOnlyIndex, SchemaColumnAllocationSize, SchemaColumnIsGenerated, SchemaVersionId, SQLDataType, TableIndex } from '@airport/ground-control';
import { ISchemaColumn } from "../../generated/schema/qschemacolumn";
import { ISchemaRelationColumn } from "../../generated/schema/qschemarelationcolumn";
import { ISchemaPropertyColumn } from "../../generated/schema/qschemapropertycolumn";
export declare class SchemaColumn implements ISchemaColumn {
    /**
     * Overall column index (within the entity).
     */
    index: ColumnIndex;
    tableIndex: TableIndex;
    schemaVersionId: SchemaVersionId;
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
