import { IVNumberField } from '@airport/airbridge-validate';
import { VersionedApplicationObjectVDescriptor } from './vversionedapplicationobject';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationVersion } from '../../ddl/application/applicationversion';
export interface ApplicationReferenceVDescriptor<T> extends VersionedApplicationObjectVDescriptor<T> {
    index?: number | IVNumberField;
    ownApplicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
    referencedApplicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
}
//# sourceMappingURL=vapplicationreference.d.ts.map