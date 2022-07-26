import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { CountryVDescriptor } from './vcountry';
import { UserAccountVDescriptor } from '../vuseraccount';
export interface ContinentVDescriptor extends IEntityVDescriptor {
    id: number | IVNumberField;
    name?: string | IVStringField;
    countries?: CountryVDescriptor;
    userAccounts?: UserAccountVDescriptor;
}
//# sourceMappingURL=vcontinent.d.ts.map