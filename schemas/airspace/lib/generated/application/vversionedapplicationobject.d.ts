import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
export interface VersionedApplicationObjectVDescriptor extends IEntityVDescriptor {
    deprecatedSinceVersion?: ApplicationVersionVDescriptor;
    removedInVersion?: ApplicationVersionVDescriptor;
    sinceVersion?: ApplicationVersionVDescriptor;
}
//# sourceMappingURL=vversionedapplicationobject.d.ts.map