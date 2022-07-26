import { IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationPropertyColumnVDescriptor } from './vapplicationpropertycolumn';
import { ApplicationRelationColumnVDescriptor } from './vapplicationrelationcolumn';
export interface ApplicationColumnVDescriptor extends VersionedApplicationObjectVDescriptor {
    _localId: number | IVNumberField;
    index?: number | IVNumberField;
    idIndex?: number | IVNumberField;
    isGenerated?: boolean | IVBooleanField;
    allocationSize?: number | IVNumberField;
    name?: string | IVStringField;
    notNull?: boolean | IVBooleanField;
    precision?: number | IVNumberField;
    scale?: number | IVNumberField;
    type?: string | IVStringField;
    entity?: ApplicationEntityVDescriptor;
    propertyColumns?: ApplicationPropertyColumnVDescriptor;
    manyRelationColumns?: ApplicationRelationColumnVDescriptor;
    oneRelationColumns?: ApplicationRelationColumnVDescriptor;
}
//# sourceMappingURL=vapplicationcolumn.d.ts.map