import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { DomainVDescriptor } from './vdomain';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationCurrentVersionVDescriptor } from './vapplicationcurrentversion';
export interface ApplicationVDescriptor extends IEntityVDescriptor {
    index: number | IVNumberField;
    GUID?: string | IVStringField;
    scope?: string | IVStringField;
    name?: string | IVStringField;
    fullName?: string | IVStringField;
    status?: string | IVStringField;
    signature?: string | IVStringField;
    domain?: DomainVDescriptor;
    versions?: ApplicationVersionVDescriptor;
    currentVersion?: ApplicationCurrentVersionVDescriptor;
}
//# sourceMappingURL=vapplication.d.ts.map