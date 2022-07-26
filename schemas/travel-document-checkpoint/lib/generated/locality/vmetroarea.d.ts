import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { CountryVDescriptor } from './vcountry';
import { MetroAreaStateVDescriptor } from './vmetroareastate';
import { UserAccountVDescriptor } from '../vuseraccount';
export interface MetroAreaVDescriptor extends IEntityVDescriptor {
    id: number | IVNumberField;
    name?: string | IVStringField;
    country?: CountryVDescriptor;
    metroAreaStates?: MetroAreaStateVDescriptor;
    userAccounts?: UserAccountVDescriptor;
}
//# sourceMappingURL=vmetroarea.d.ts.map