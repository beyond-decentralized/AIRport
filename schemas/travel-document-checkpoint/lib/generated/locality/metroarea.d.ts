import { ICountry } from './country';
import { IMetroAreaState } from './metroareastate';
import { IUserAccount } from '../userAccount';
export interface IMetroArea {
    id: number;
    name?: string;
    country?: ICountry;
    metroAreaStates?: IMetroAreaState[];
    userAccounts?: IUserAccount[];
}
//# sourceMappingURL=metroarea.d.ts.map