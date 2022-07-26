import { IVNumberField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
export interface ApplicationReferenceVDescriptor extends VersionedApplicationObjectVDescriptor {
    index?: number | IVNumberField;
    ownApplicationVersion?: ApplicationVersionVDescriptor;
    referencedApplicationVersion?: ApplicationVersionVDescriptor;
}
//# sourceMappingURL=vapplicationreference.d.ts.map