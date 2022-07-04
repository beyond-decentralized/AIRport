import { ForeignKey, ManyToOneElements, OneToManyElements } from '@airport/air-traffic-control';
import { EntityRelationType, ApplicationRelation_LocalId, ApplicationRelation_Index } from '@airport/ground-control';
import { ApplicationEntity } from './ApplicationEntity';
import { ApplicationProperty } from './ApplicationProperty';
import { ApplicationRelationColumn } from './ApplicationRelationColumn';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare class ApplicationRelation extends VersionedApplicationObject {
    _localId: ApplicationRelation_LocalId;
    index: ApplicationRelation_Index;
    property: ApplicationProperty;
    foreignKey: ForeignKey;
    manyToOneElems: ManyToOneElements;
    oneToManyElems: OneToManyElements;
    relationType: EntityRelationType;
    isId: boolean;
    entity: ApplicationEntity;
    relationEntity: ApplicationEntity;
    manyRelationColumns: ApplicationRelationColumn[];
    oneRelationColumns?: ApplicationRelationColumn[];
}
//# sourceMappingURL=ApplicationRelation.d.ts.map