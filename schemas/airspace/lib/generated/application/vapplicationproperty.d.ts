import { IVBooleanField, IVNumberField, IVStringField } from '@airbridge/validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationEntity } from '../../ddl/application/ApplicationEntity';
import { ApplicationPropertyColumnVDescriptor } from './vapplicationpropertycolumn';
import { ApplicationPropertyColumn } from '../../ddl/application/ApplicationPropertyColumn';
import { ApplicationRelationVDescriptor } from './vapplicationrelation';
import { ApplicationRelation } from '../../ddl/application/ApplicationRelation';
export interface ApplicationPropertyVDescriptor<T> extends VersionedApplicationObjectVDescriptor<T> {
    _localId?: number | IVNumberField;
    index?: number | IVNumberField;
    name?: string | IVStringField;
    isId?: boolean | IVBooleanField;
    entity?: ApplicationEntityVDescriptor<ApplicationEntity>;
    propertyColumns?: ApplicationPropertyColumnVDescriptor<ApplicationPropertyColumn>;
    relation?: ApplicationRelationVDescriptor<ApplicationRelation>;
}
//# sourceMappingURL=vapplicationproperty.d.ts.map