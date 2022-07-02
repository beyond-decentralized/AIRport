import { ICountry } from './country';
import { IState } from './state';
import { IUser } from '../user';
export interface IMetroArea {
    id: number;
    name?: string;
    country?: ICountry;
    metroAreaStates?: IState[];
    users?: IUser[];
}
//# sourceMappingURL=metroarea.d.ts.map