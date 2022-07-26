import { IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationEntity_TableConfiguration } from '@airport/tarmaq-entity';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationColumnVDescriptor } from './vapplicationcolumn';
import { ApplicationOperationVDescriptor } from './vapplicationoperation';
import { ApplicationPropertyVDescriptor } from './vapplicationproperty';
import { ApplicationRelationVDescriptor } from './vapplicationrelation';
export interface ApplicationEntityVDescriptor extends VersionedApplicationObjectVDescriptor {
    _localId: number | IVNumberField;
    index?: number | IVNumberField;
    isLocal?: boolean | IVBooleanField;
    isAirEntity?: boolean | IVBooleanField;
    name?: string | IVStringField;
    tableConfig?: ApplicationEntity_TableConfiguration | IVStringField;
    applicationVersion?: ApplicationVersionVDescriptor;
    columns?: ApplicationColumnVDescriptor;
    operations?: ApplicationOperationVDescriptor;
    properties?: ApplicationPropertyVDescriptor;
    relations?: ApplicationRelationVDescriptor;
    relationReferences?: ApplicationRelationVDescriptor;
}
//# sourceMappingURL=vapplicationentity.d.ts.map