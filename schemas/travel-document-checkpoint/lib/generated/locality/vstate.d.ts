import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { CountryVDescriptor } from './vcountry';
import { Country } from '../../ddl/locality/Country';
import { State } from '../../ddl/locality/State';
import { UserAccountVDescriptor } from '../vuseraccount';
import { UserAccount } from '../../ddl/UserAccount';
export interface StateVDescriptor<T> extends IEntityVDescriptor<T> {
    id?: number | IVNumberField;
    abbreviation?: string | IVStringField;
    name?: string | IVStringField;
    country?: CountryVDescriptor<Country>;
    metroAreaStates?: StateVDescriptor<State>;
    userAccounts?: UserAccountVDescriptor<UserAccount>;
}
//# sourceMappingURL=vstate.d.ts.map