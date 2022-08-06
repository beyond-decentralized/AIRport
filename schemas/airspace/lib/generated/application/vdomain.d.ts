import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airbridge/validate';
import { ApplicationVDescriptor } from './vapplication';
import { Application } from '../../ddl/application/application';
export interface DomainVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    name?: string | IVStringField;
    applications?: ApplicationVDescriptor<Application>;
}
//# sourceMappingURL=vdomain.d.ts.map