import { IContinent } from './continent';
import { IUser } from '../user';
export interface ICountry {
    id: number;
    name?: string;
    continent?: IContinent;
    users?: IUser[];
}
//# sourceMappingURL=country.d.ts.map