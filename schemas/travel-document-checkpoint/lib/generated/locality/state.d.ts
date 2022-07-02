import { ICountry } from './country';
import { IUser } from '../user';
export interface IState {
    id: number;
    name?: string;
    country?: ICountry;
    metroAreaStates?: IState[];
    users?: IUser[];
}
//# sourceMappingURL=state.d.ts.map