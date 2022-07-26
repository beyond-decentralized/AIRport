import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { JsonApplicationWithLastIds } from '@airport/apron';
import { ApplicationVDescriptor } from './vapplication';
import { ApplicationEntityVDescriptor } from './vapplicationentity';
import { ApplicationReferenceVDescriptor } from './vapplicationreference';
export interface ApplicationVersionVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    integerVersion?: number | IVNumberField;
    versionString?: string | IVStringField;
    majorVersion?: number | IVNumberField;
    minorVersion?: number | IVNumberField;
    patchVersion?: number | IVNumberField;
    jsonApplication?: JsonApplicationWithLastIds | IVStringField;
    application?: ApplicationVDescriptor;
    entities?: ApplicationEntityVDescriptor;
    references?: ApplicationReferenceVDescriptor;
    referencedBy?: ApplicationReferenceVDescriptor;
}
//# sourceMappingURL=vapplicationversion.d.ts.map