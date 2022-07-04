import { ApplicationProperty_LocalId, ApplicationProperty_Index, ApplicationProperty_IsId, ApplicationProperty_Name } from '@airport/ground-control';
import { ApplicationEntity } from './ApplicationEntity';
import { ApplicationPropertyColumn } from './ApplicationPropertyColumn';
import { ApplicationRelation } from './ApplicationRelation';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare class ApplicationProperty extends VersionedApplicationObject {
    _localId: ApplicationProperty_LocalId;
    index: ApplicationProperty_Index;
    name: ApplicationProperty_Name;
    isId: ApplicationProperty_IsId;
    entity: ApplicationEntity;
    propertyColumns: ApplicationPropertyColumn[];
    relation: ApplicationRelation[];
}
//# sourceMappingURL=ApplicationProperty.d.ts.map