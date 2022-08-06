import { IEntityVDescriptor, IVBooleanField, IVNumberField, IVStringField } from '@airbridge/validate';
import { UserAccountVDescriptor } from '../vuseraccount';
import { UserAccount } from '../../ddl/UserAccount';
import { ContinentVDescriptor } from '../locality/vcontinent';
import { Continent } from '../../ddl/locality/Continent';
import { CountryVDescriptor } from '../locality/vcountry';
import { Country } from '../../ddl/locality/Country';
import { StateVDescriptor } from '../locality/vstate';
import { State } from '../../ddl/locality/State';
import { MetroAreaVDescriptor } from '../locality/vmetroarea';
import { MetroArea } from '../../ddl/locality/MetroArea';
import { TerminalTypeVDescriptor } from './vterminaltype';
import { TerminalType } from '../../ddl/terminal/TerminalType';
export interface TerminalVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    GUID?: string | IVStringField;
    isLocal?: boolean | IVBooleanField;
    owner?: UserAccountVDescriptor<UserAccount>;
    continent?: ContinentVDescriptor<Continent>;
    country?: CountryVDescriptor<Country>;
    state?: StateVDescriptor<State>;
    metroArea?: MetroAreaVDescriptor<MetroArea>;
    terminalTypes?: TerminalTypeVDescriptor<TerminalType>;
}
//# sourceMappingURL=vterminal.d.ts.map