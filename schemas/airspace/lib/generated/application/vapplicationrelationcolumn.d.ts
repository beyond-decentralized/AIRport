import { IVNumberField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationColumnVDescriptor } from './vapplicationcolumn';
import { ApplicationRelationVDescriptor } from './vapplicationrelation';
export interface ApplicationRelationColumnVDescriptor extends VersionedApplicationObjectVDescriptor {
    _localId: number | IVNumberField;
    manyColumn?: ApplicationColumnVDescriptor;
    oneColumn?: ApplicationColumnVDescriptor;
    manyRelation?: ApplicationRelationVDescriptor;
    oneRelation?: ApplicationRelationVDescriptor;
    parentRelation?: ApplicationRelationVDescriptor;
}
//# sourceMappingURL=vapplicationrelationcolumn.d.ts.map