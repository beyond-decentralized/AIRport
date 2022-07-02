import { IContinent } from '../locality/continent';
import { ICountry } from '../locality/country';
import { IState } from '../locality/state';
import { IMetroArea } from '../locality/metroarea';
import { IClientType } from './clienttype';
export interface IClient {
    id: number;
    domain?: string;
    GUID?: string;
    continent?: IContinent;
    country?: ICountry;
    state?: IState;
    metroArea?: IMetroArea;
    clientTypes?: IClientType[];
}
//# sourceMappingURL=client.d.ts.map