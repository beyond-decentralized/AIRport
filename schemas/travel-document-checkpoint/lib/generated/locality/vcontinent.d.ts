import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { CountryVDescriptor } from './vcountry';
import { Country } from '../../ddl/locality/Country';
import { UserAccountVDescriptor } from '../vuseraccount';
import { UserAccount } from '../../ddl/UserAccount';
export interface ContinentVDescriptor<T> extends IEntityVDescriptor<T> {
    id?: number | IVNumberField;
    name?: string | IVStringField;
    countries?: CountryVDescriptor<Country>;
    userAccounts?: UserAccountVDescriptor<UserAccount>;
}
//# sourceMappingURL=vcontinent.d.ts.map