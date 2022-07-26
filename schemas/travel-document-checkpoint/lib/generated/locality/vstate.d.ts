import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { CountryVDescriptor } from './vcountry';
import { UserAccountVDescriptor } from '../vuseraccount';
export interface StateVDescriptor extends IEntityVDescriptor {
    id: number | IVNumberField;
    abbreviation?: string | IVStringField;
    name?: string | IVStringField;
    country?: CountryVDescriptor;
    metroAreaStates?: StateVDescriptor;
    userAccounts?: UserAccountVDescriptor;
}
//# sourceMappingURL=vstate.d.ts.map