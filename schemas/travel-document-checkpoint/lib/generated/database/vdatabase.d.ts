import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airbridge/validate';
import { ContinentVDescriptor } from '../locality/vcontinent';
import { Continent } from '../../ddl/locality/Continent';
import { CountryVDescriptor } from '../locality/vcountry';
import { Country } from '../../ddl/locality/Country';
import { StateVDescriptor } from '../locality/vstate';
import { State } from '../../ddl/locality/State';
import { MetroAreaVDescriptor } from '../locality/vmetroarea';
import { MetroArea } from '../../ddl/locality/MetroArea';
import { DatabaseTypeVDescriptor } from './vdatabasetype';
import { DatabaseType } from '../../ddl/database/DatabaseType';
export interface DatabaseVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    domain?: string | IVStringField;
    GUID?: string | IVStringField;
    continent?: ContinentVDescriptor<Continent>;
    country?: CountryVDescriptor<Country>;
    state?: StateVDescriptor<State>;
    metroArea?: MetroAreaVDescriptor<MetroArea>;
    databaseTypes?: DatabaseTypeVDescriptor<DatabaseType>;
}
//# sourceMappingURL=vdatabase.d.ts.map