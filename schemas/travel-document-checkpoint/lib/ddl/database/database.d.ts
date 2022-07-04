import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { DatabaseType } from "./DatabaseType";
export declare type Database_LocalId = number;
export declare type Database_Domain = string;
export declare type Database_GUID = string;
export declare class Database {
    _localId: Database_LocalId;
    domain: Database_Domain;
    GUID: Database_GUID;
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
    databaseTypes: DatabaseType[];
}
//# sourceMappingURL=Database.d.ts.map