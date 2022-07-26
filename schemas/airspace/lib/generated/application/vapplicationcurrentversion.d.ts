import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { ApplicationVDescriptor } from './vapplication';
import { ApplicationVersionVDescriptor } from './vapplicationversion';
export interface ApplicationCurrentVersionVDescriptor extends IEntityVDescriptor {
    application?: ApplicationVDescriptor;
    applicationVersion?: ApplicationVersionVDescriptor;
}
//# sourceMappingURL=vapplicationcurrentversion.d.ts.map