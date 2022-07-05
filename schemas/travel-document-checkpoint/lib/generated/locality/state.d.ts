import { ICountry } from './country';
import { IUser } from '../user';
export interface IState {
    id: number;
    abbreviation?: string;
    name?: string;
    country?: ICountry;
    metroAreaStates?: IState[];
    users?: IUser[];
}
//# sourceMappingURL=state.d.ts.map