import { IEntityVDescriptor } from '@airbridge/validate';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationVersion } from '../../ddl/application/ApplicationVersion';
export interface VersionedApplicationObjectVDescriptor<T> extends IEntityVDescriptor<T> {
    deprecatedSinceVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
    removedInVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
    sinceVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
}
//# sourceMappingURL=vversionedapplicationobject.d.ts.map