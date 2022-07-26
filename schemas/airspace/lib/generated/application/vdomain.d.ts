import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { ApplicationVDescriptor } from './vapplication';
export interface DomainVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    name?: string | IVStringField;
    applications?: ApplicationVDescriptor;
}
//# sourceMappingURL=vdomain.d.ts.map