import { IVBooleanField, IVNumberField, IVStringField } from '@airbridge/validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationEntity } from '../../ddl/application/applicationentity';
import { ApplicationPropertyColumnVDescriptor } from './vapplicationpropertycolumn';
import { ApplicationPropertyColumn } from '../../ddl/application/applicationpropertycolumn';
import { ApplicationRelationColumnVDescriptor } from './vapplicationrelationcolumn';
import { ApplicationRelationColumn } from '../../ddl/application/applicationrelationcolumn';
export interface ApplicationColumnVDescriptor<T> extends VersionedApplicationObjectVDescriptor<T> {
    _localId?: number | IVNumberField;
    index?: number | IVNumberField;
    idIndex?: number | IVNumberField;
    isGenerated?: boolean | IVBooleanField;
    allocationSize?: number | IVNumberField;
    name?: string | IVStringField;
    notNull?: boolean | IVBooleanField;
    precision?: number | IVNumberField;
    scale?: number | IVNumberField;
    type?: string | IVStringField;
    entity?: ApplicationEntityVDescriptor<ApplicationEntity>;
    propertyColumns?: ApplicationPropertyColumnVDescriptor<ApplicationPropertyColumn>;
    manyRelationColumns?: ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>;
    oneRelationColumns?: ApplicationRelationColumnVDescriptor<ApplicationRelationColumn>;
}
//# sourceMappingURL=vapplicationcolumn.d.ts.map