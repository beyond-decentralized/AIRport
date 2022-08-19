import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airbridge/validate';
import { DomainVDescriptor } from './vdomain';
import { Domain } from '../../ddl/application/Domain';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
import { ApplicationVersion } from '../../ddl/application/ApplicationVersion';
import { ApplicationCurrentVersionVDescriptor } from './vapplicationcurrentversion';
import { ApplicationCurrentVersion } from '../../ddl/application/ApplicationCurrentVersion';
export interface ApplicationVDescriptor<T> extends IEntityVDescriptor<T> {
    index?: number | IVNumberField;
    GUID?: string | IVStringField;
    scope?: string | IVStringField;
    name?: string | IVStringField;
    fullName?: string | IVStringField;
    status?: string | IVStringField;
    signature?: string | IVStringField;
    domain?: DomainVDescriptor<Domain>;
    versions?: ApplicationVersionVDescriptor<ApplicationVersion>;
    currentVersion?: ApplicationCurrentVersionVDescriptor<ApplicationCurrentVersion>;
}
//# sourceMappingURL=vapplication.d.ts.map