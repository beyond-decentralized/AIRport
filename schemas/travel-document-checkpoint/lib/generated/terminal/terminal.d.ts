import { IUser } from '../user';
import { IContinent } from '../locality/continent';
import { ICountry } from '../locality/country';
import { IState } from '../locality/state';
import { IMetroArea } from '../locality/metroarea';
import { ITerminalType } from './terminaltype';
export interface ITerminal {
    _localId: number;
    GUID?: string;
    isLocal?: boolean;
    owner?: IUser;
    continent?: IContinent;
    country?: ICountry;
    state?: IState;
    metroArea?: IMetroArea;
    terminalTypes?: ITerminalType[];
}
//# sourceMappingURL=terminal.d.ts.map