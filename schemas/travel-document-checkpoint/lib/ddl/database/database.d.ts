import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { DatabaseType } from "./DatabaseType";
export declare class Database {
    id: number;
    domain: string;
    GUID: string;
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
    databaseTypes: DatabaseType[];
}
//# sourceMappingURL=Database.d.ts.map