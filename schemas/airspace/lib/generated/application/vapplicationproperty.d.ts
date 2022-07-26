import { IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationPropertyColumnVDescriptor } from './vapplicationpropertycolumn';
import { ApplicationRelationVDescriptor } from './vapplicationrelation';
export interface ApplicationPropertyVDescriptor extends VersionedApplicationObjectVDescriptor {
    _localId: number | IVNumberField;
    index?: number | IVNumberField;
    name?: string | IVStringField;
    isId?: boolean | IVBooleanField;
    entity?: ApplicationEntityVDescriptor;
    propertyColumns?: ApplicationPropertyColumnVDescriptor;
    relation?: ApplicationRelationVDescriptor;
}
//# sourceMappingURL=vapplicationproperty.d.ts.map