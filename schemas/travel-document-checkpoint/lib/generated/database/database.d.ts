import { IContinent } from '../locality/continent';
import { ICountry } from '../locality/country';
import { IState } from '../locality/state';
import { IMetroArea } from '../locality/metroarea';
import { IDatabaseType } from './databasetype';
export interface IDatabase {
    _localId: number;
    domain?: string;
    GUID?: string;
    continent?: IContinent;
    country?: ICountry;
    state?: IState;
    metroArea?: IMetroArea;
    databaseTypes?: IDatabaseType[];
}
//# sourceMappingURL=database.d.ts.map