import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { ContinentVDescriptor } from './vcontinent';
import { UserAccountVDescriptor } from '../vuseraccount';
export interface CountryVDescriptor extends IEntityVDescriptor {
    id: number | IVNumberField;
    abbreviation?: string | IVStringField;
    name?: string | IVStringField;
    continent?: ContinentVDescriptor;
    userAccounts?: UserAccountVDescriptor;
}
//# sourceMappingURL=vcountry.d.ts.map