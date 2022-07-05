import { IContinent } from './continent';
import { IUser } from '../user';
export interface ICountry {
    id: number;
    abbreviation?: string;
    name?: string;
    continent?: IContinent;
    users?: IUser[];
}
//# sourceMappingURL=country.d.ts.map