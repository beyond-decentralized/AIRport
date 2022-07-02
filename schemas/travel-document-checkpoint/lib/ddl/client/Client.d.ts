import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { ClientType } from "./ClientType";
export declare class Client {
    id: number;
    domain: string;
    GUID: string;
    clienType: ClientType;
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
}
//# sourceMappingURL=Client.d.ts.map