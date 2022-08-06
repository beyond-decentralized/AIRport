import { IEntityVDescriptor } from '@airbridge/validate';
import { ApplicationVDescriptor } from './vapplication';
import { Application } from '../../ddl/application/application';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationVersion } from '../../ddl/application/applicationversion';
export interface ApplicationCurrentVersionVDescriptor<T> extends IEntityVDescriptor<T> {
    application?: ApplicationVDescriptor<Application>;
    applicationVersion?: ApplicationVersionVDescriptor<ApplicationVersion>;
}
//# sourceMappingURL=vapplicationcurrentversion.d.ts.map