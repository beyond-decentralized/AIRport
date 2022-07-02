import { IUser } from './user';
import { IContinent } from './locality/continent';
import { ICountry } from './locality/country';
import { IState } from './locality/state';
import { IMetroArea } from './locality/metroarea';
export interface ITerminal {
    id: number;
    GUID?: string;
    isLocal?: boolean;
    owner?: IUser;
    continent?: IContinent;
    country?: ICountry;
    state?: IState;
    metroArea?: IMetroArea;
}
//# sourceMappingURL=terminal.d.ts.map