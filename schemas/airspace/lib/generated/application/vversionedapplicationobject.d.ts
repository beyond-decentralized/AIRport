import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationVersion } from '../../ddl/application/applicationversion';
export interface VersionedApplicationObjectVDescriptor<T> extends IEntityVDescriptor<T> {
    deprecatedSinceVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
    removedInVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
    sinceVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
}
//# sourceMappingURL=vversionedapplicationobject.d.ts.map