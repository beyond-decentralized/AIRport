import { IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { Operation_Rule } from '@airport/ground-control';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationEntity } from '../../ddl/application/applicationentity';
export interface ApplicationOperationVDescriptor<T> extends VersionedApplicationObjectVDescriptor<T> {
    _localId?: number | IVNumberField;
    type?: number | IVNumberField;
    name?: string | IVStringField;
    rule?: Operation_Rule | IVStringField;
    entity?: ApplicationEntityVDescriptor<ApplicationEntity>;
}
//# sourceMappingURL=vapplicationoperation.d.ts.map