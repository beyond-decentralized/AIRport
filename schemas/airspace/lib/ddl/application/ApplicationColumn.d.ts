import { ApplicationColumn_LocalId, ApplicationColumn_Index, ApplicationColumn_Name, ApplicationColumn_NotNull, ApplicationColumn_Precision, ApplicationColumn_Scale, ApplicationColumn_IdIndex, ApplicationColumn_AllocationSize, ApplicationColumn_IsGenerated, SQLDataType } from '@airport/ground-control';
import { ApplicationEntity } from './ApplicationEntity';
import { ApplicationPropertyColumn } from './ApplicationPropertyColumn';
import { ApplicationRelationColumn } from './ApplicationRelationColumn';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare class ApplicationColumn extends VersionedApplicationObject {
    _localId: ApplicationColumn_LocalId;
    /**
     * Overall column index (within the entity).
     */
    index: ApplicationColumn_Index;
    /**
     * Index of the ID (within the entity)
     */
    idIndex?: ApplicationColumn_IdIndex;
    isGenerated: ApplicationColumn_IsGenerated;
    allocationSize?: ApplicationColumn_AllocationSize;
    name: ApplicationColumn_Name;
    notNull: ApplicationColumn_NotNull;
    precision: ApplicationColumn_Precision;
    scale: ApplicationColumn_Scale;
    type: SQLDataType;
    entity: ApplicationEntity;
    propertyColumns: ApplicationPropertyColumn[];
    manyRelationColumns: ApplicationRelationColumn[];
    oneRelationColumns: ApplicationRelationColumn[];
}
//# sourceMappingURL=ApplicationColumn.d.ts.map