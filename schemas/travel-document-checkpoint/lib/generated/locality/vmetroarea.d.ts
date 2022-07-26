import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { CountryVDescriptor } from './vcountry';
import { Country } from '../../ddl/locality/Country';
import { MetroAreaStateVDescriptor } from './vmetroareastate';
import { MetroAreaState } from '../../ddl/locality/MetroAreaState';
import { UserAccountVDescriptor } from '../vuseraccount';
import { UserAccount } from '../../ddl/UserAccount';
export interface MetroAreaVDescriptor<T> extends IEntityVDescriptor<T> {
    id?: number | IVNumberField;
    name?: string | IVStringField;
    country?: CountryVDescriptor<Country>;
    metroAreaStates?: MetroAreaStateVDescriptor<MetroAreaState>;
    userAccounts?: UserAccountVDescriptor<UserAccount>;
}
//# sourceMappingURL=vmetroarea.d.ts.map