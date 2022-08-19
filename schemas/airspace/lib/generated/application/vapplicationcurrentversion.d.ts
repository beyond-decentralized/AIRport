import { IEntityVDescriptor } from '@airbridge/validate';
import { ApplicationVDescriptor } from './vapplication';
import { Application } from '../../ddl/application/Application';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationVersion } from '../../ddl/application/ApplicationVersion';
export interface ApplicationCurrentVersionVDescriptor<T> extends IEntityVDescriptor<T> {
    application?: ApplicationVDescriptor<Application>;
    applicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
}
//# sourceMappingURL=vapplicationcurrentversion.d.ts.map