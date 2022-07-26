import { IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { Operation_Rule } from '@airport/ground-control';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
export interface ApplicationOperationVDescriptor extends VersionedApplicationObjectVDescriptor {
    _localId: number | IVNumberField;
    type?: number | IVNumberField;
    name?: string | IVStringField;
    rule?: Operation_Rule | IVStringField;
    entity?: ApplicationEntityVDescriptor;
}
//# sourceMappingURL=vapplicationoperation.d.ts.map