import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airbridge/validate';
import { ContinentVDescriptor } from '../locality/vcontinent';
import { Continent } from '../../ddl/locality/Continent';
import { CountryVDescriptor } from '../locality/vcountry';
import { Country } from '../../ddl/locality/Country';
import { StateVDescriptor } from '../locality/vstate';
import { State } from '../../ddl/locality/State';
import { MetroAreaVDescriptor } from '../locality/vmetroarea';
import { MetroArea } from '../../ddl/locality/MetroArea';
import { ClientTypeVDescriptor } from './vclienttype';
import { ClientType } from '../../ddl/client/ClientType';
export interface ClientVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    domain?: string | IVStringField;
    GUID?: string | IVStringField;
    continent?: ContinentVDescriptor<Continent>;
    country?: CountryVDescriptor<Country>;
    state?: StateVDescriptor<State>;
    metroArea?: MetroAreaVDescriptor<MetroArea>;
    clientTypes?: ClientTypeVDescriptor<ClientType>;
}
//# sourceMappingURL=vclient.d.ts.map