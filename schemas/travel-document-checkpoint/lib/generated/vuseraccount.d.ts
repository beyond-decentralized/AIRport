import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { DomainVDescriptor } from '@airport/airspace';
import { ContinentVDescriptor } from './locality/vcontinent';
import { CountryVDescriptor } from './locality/vcountry';
import { StateVDescriptor } from './locality/vstate';
import { MetroAreaVDescriptor } from './locality/vmetroarea';
export interface UserAccountVDescriptor extends IEntityVDescriptor {
    _localId?: number | IVNumberField;
    email?: string | IVStringField;
    passwordHash?: string | IVStringField;
    ranking?: number | IVNumberField;
    username?: string | IVStringField;
    GUID?: string | IVStringField;
    domain?: DomainVDescriptor;
    continent?: ContinentVDescriptor;
    country?: CountryVDescriptor;
    state?: StateVDescriptor;
    metroArea?: MetroAreaVDescriptor;
}
//# sourceMappingURL=vuseraccount.d.ts.map