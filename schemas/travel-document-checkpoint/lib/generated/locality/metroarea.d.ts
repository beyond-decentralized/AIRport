import { ICountry } from './country';
import { IMetroAreaState } from './metroareastate';
import { IUser } from '../user';
export interface IMetroArea {
    id: number;
    name?: string;
    country?: ICountry;
    metroAreaStates?: IMetroAreaState[];
    users?: IUser[];
}
//# sourceMappingURL=metroarea.d.ts.map