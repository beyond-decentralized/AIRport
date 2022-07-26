import { IEntityVDescriptor, IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { UserAccountVDescriptor } from '../vuseraccount';
import { ContinentVDescriptor } from '../locality/vcontinent';
import { CountryVDescriptor } from '../locality/vcountry';
import { StateVDescriptor } from '../locality/vstate';
import { MetroAreaVDescriptor } from '../locality/vmetroarea';
import { TerminalTypeVDescriptor } from './vterminaltype';
export interface TerminalVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    GUID?: string | IVStringField;
    isLocal?: boolean | IVBooleanField;
    owner?: UserAccountVDescriptor;
    continent?: ContinentVDescriptor;
    country?: CountryVDescriptor;
    state?: StateVDescriptor;
    metroArea?: MetroAreaVDescriptor;
    terminalTypes?: TerminalTypeVDescriptor;
}
//# sourceMappingURL=vterminal.d.ts.map