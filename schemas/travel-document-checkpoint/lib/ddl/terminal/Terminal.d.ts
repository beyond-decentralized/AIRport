import { Continent } from '../locality/Continent';
import { Country } from '../locality/Country';
import { MetroArea } from '../locality/MetroArea';
import { State } from '../locality/State';
import { User } from '../User';
import { TerminalType } from './TerminalType';
export declare type Terminal_LocalId = number;
export declare type Terminal_IsLocal = boolean;
export declare type Terminal_GUID = string;
export declare class Terminal {
    _localId: Terminal_LocalId;
    GUID: Terminal_GUID;
    owner?: User;
    isLocal: Terminal_IsLocal;
    continent?: Continent;
    country?: Country;
    state?: State;
    metroArea?: MetroArea;
    terminalTypes: TerminalType[];
}
//# sourceMappingURL=Terminal.d.ts.map