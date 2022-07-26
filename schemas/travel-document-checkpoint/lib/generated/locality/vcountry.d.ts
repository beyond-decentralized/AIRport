import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { ContinentVDescriptor } from './vcontinent';
import { Continent } from '../../ddl/locality/Continent';
import { UserAccountVDescriptor } from '../vuseraccount';
import { UserAccount } from '../../ddl/UserAccount';
export interface CountryVDescriptor<T> extends IEntityVDescriptor<T> {
    id?: number | IVNumberField;
    abbreviation?: string | IVStringField;
    name?: string | IVStringField;
    continent?: ContinentVDescriptor<Continent>;
    userAccounts?: UserAccountVDescriptor<UserAccount>;
}
//# sourceMappingURL=vcountry.d.ts.map