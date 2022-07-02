import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { User } from '../User';
import { TerminalType } from './TerminalType';
export declare type TmTerminal_Id = number;
export declare type Terminal_IsLocal = boolean;
export declare type Terminal_GUID = string;
export declare class Terminal {
    id: TmTerminal_Id;
    GUID: Terminal_GUID;
    owner?: User;
    isLocal: Terminal_IsLocal;
    continent?: Continent;
    country?: Country;
    terminalTypes: TerminalType[];
    state?: State;
    metroArea?: MetroArea;
}
//# sourceMappingURL=Terminal.d.ts.map