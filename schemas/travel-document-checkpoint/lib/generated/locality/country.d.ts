import { IContinent } from './continent';
import { IUserAccount } from '../useraccount';
export interface ICountry {
    id: number;
    abbreviation?: string;
    name?: string;
    continent?: IContinent;
    userAccounts?: IUserAccount[];
}
//# sourceMappingURL=country.d.ts.map