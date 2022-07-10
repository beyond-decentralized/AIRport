import { ICountry } from './country';
import { IUserAccount } from '../userAccount';
export interface IState {
    id: number;
    abbreviation?: string;
    name?: string;
    country?: ICountry;
    metroAreaStates?: IState[];
    userAccounts?: IUserAccount[];
}
//# sourceMappingURL=state.d.ts.map