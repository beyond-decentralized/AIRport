import { ColumnId, ColumnIndex, ColumnName, ColumnNotNull, ColumnPrecision, ColumnScale, IdColumnOnlyIndex, ApplicationColumnAllocationSize, ApplicationColumnIsGenerated, SQLDataType } from '@airport/ground-control';
import { ApplicationEntity } from './ApplicationEntity';
import { ApplicationPropertyColumn } from './ApplicationPropertyColumn';
import { ApplicationRelationColumn } from './ApplicationRelationColumn';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare class ApplicationColumn extends VersionedApplicationObject {
    id: ColumnId;
    /**
     * Overall column index (within the entity).
     */
    index: ColumnIndex;
    /**
     * Index of the ID (within the entity)
     */
    idIndex?: IdColumnOnlyIndex;
    isGenerated: ApplicationColumnIsGenerated;
    allocationSize?: ApplicationColumnAllocationSize;
    name: ColumnName;
    notNull: ColumnNotNull;
    precision: ColumnPrecision;
    scale: ColumnScale;
    type: SQLDataType;
    entity: ApplicationEntity;
    propertyColumns: ApplicationPropertyColumn[];
    manyRelationColumns: ApplicationRelationColumn[];
    oneRelationColumns: ApplicationRelationColumn[];
}
//# sourceMappingURL=ApplicationColumn.d.ts.map