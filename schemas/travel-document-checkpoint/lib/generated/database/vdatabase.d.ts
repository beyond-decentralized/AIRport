import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { ContinentVDescriptor } from '../locality/vcontinent';
import { CountryVDescriptor } from '../locality/vcountry';
import { StateVDescriptor } from '../locality/vstate';
import { MetroAreaVDescriptor } from '../locality/vmetroarea';
import { DatabaseTypeVDescriptor } from './vdatabasetype';
export interface DatabaseVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    domain?: string | IVStringField;
    GUID?: string | IVStringField;
    continent?: ContinentVDescriptor;
    country?: CountryVDescriptor;
    state?: StateVDescriptor;
    metroArea?: MetroAreaVDescriptor;
    databaseTypes?: DatabaseTypeVDescriptor;
}
//# sourceMappingURL=vdatabase.d.ts.map