import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { ClientType } from "./ClientType";
export declare type Client_LocalId = number;
export declare type Client_Domain = string;
export declare type Client_GUID = string;
export declare class Client {
    _localId: Client_LocalId;
    domain: Client_Domain;
    GUID: Client_GUID;
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
    clientTypes: ClientType[];
}
//# sourceMappingURL=Client.d.ts.map