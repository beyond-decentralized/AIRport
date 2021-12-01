import { PropertyId, PropertyIndex, PropertyIsId, PropertyName } from '@airport/ground-control';
import { ApplicationEntity } from './ApplicationEntity';
import { ApplicationPropertyColumn } from './ApplicationPropertyColumn';
import { ApplicationRelation } from './ApplicationRelation';
import { VersionedApplicationObject } from './VersionedApplicationObject';
export declare class ApplicationProperty extends VersionedApplicationObject {
    id: PropertyId;
    index: PropertyIndex;
    name: PropertyName;
    isId: PropertyIsId;
    entity: ApplicationEntity;
    propertyColumns: ApplicationPropertyColumn[];
    relation: ApplicationRelation[];
}
//# sourceMappingURL=ApplicationProperty.d.ts.map