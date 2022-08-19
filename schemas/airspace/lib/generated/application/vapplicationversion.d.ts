import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airbridge/validate';
import { JsonApplicationWithLastIds } from '@airport/apron';
import { ApplicationVDescriptor } from './vapplication';
import { Application } from '../../ddl/application/Application';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationEntity } from '../../ddl/application/ApplicationEntity';
import { ApplicationReferenceVDescriptor } from './vapplicationreference';
import { ApplicationReference } from '../../ddl/application/ApplicationReference';
export interface ApplicationVersionVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    integerVersion?: number | IVNumberField;
    versionString?: string | IVStringField;
    majorVersion?: number | IVNumberField;
    minorVersion?: number | IVNumberField;
    patchVersion?: number | IVNumberField;
    jsonApplication?: JsonApplicationWithLastIds | IVStringField;
    application?: ApplicationVDescriptor<Application>;
    entities?: ApplicationEntityVDescriptor<ApplicationEntity>;
    references?: ApplicationReferenceVDescriptor<ApplicationReference>;
    referencedBy?: ApplicationReferenceVDescriptor<ApplicationReference>;
}
//# sourceMappingURL=vapplicationversion.d.ts.map