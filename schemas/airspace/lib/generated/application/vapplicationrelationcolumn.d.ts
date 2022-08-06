import { IVNumberField } from '@airbridge/validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationColumnVDescriptor } from './vapplicationcolumn';
import { ApplicationColumn } from '../../ddl/application/applicationcolumn';
import { ApplicationRelationVDescriptor } from './vapplicationrelation';
import { ApplicationRelation } from '../../ddl/application/applicationrelation';
export interface ApplicationRelationColumnVDescriptor<T> extends VersionedApplicationObjectVDescriptor<T> {
    _localId?: number | IVNumberField;
    manyColumn?: ApplicationColumnVDescriptor<ApplicationColumn>;
    oneColumn?: ApplicationColumnVDescriptor<ApplicationColumn>;
    manyRelation?: ApplicationRelationVDescriptor<ApplicationRelation>;
    oneRelation?: ApplicationRelationVDescriptor<ApplicationRelation>;
    parentRelation?: ApplicationRelationVDescriptor<ApplicationRelation>;
}
//# sourceMappingURL=vapplicationrelationcolumn.d.ts.map