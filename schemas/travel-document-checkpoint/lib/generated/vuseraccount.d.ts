import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airbridge/validate';
import { DomainVDescriptor } from '@airport/airspace';
import { Domain } from '@airport/airspace';
import { ContinentVDescriptor } from './locality/vcontinent';
import { Continent } from '../ddl/locality/Continent';
import { CountryVDescriptor } from './locality/vcountry';
import { Country } from '../ddl/locality/Country';
import { StateVDescriptor } from './locality/vstate';
import { State } from '../ddl/locality/State';
import { MetroAreaVDescriptor } from './locality/vmetroarea';
import { MetroArea } from '../ddl/locality/MetroArea';
export interface UserAccountVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    email?: string | IVStringField;
    passwordHash?: string | IVStringField;
    ranking?: number | IVNumberField;
    username?: string | IVStringField;
    GUID?: string | IVStringField;
    domain?: DomainVDescriptor<Domain>;
    continent?: ContinentVDescriptor<Continent>;
    country?: CountryVDescriptor<Country>;
    state?: StateVDescriptor<State>;
    metroArea?: MetroAreaVDescriptor<MetroArea>;
}
//# sourceMappingURL=vuseraccount.d.ts.map