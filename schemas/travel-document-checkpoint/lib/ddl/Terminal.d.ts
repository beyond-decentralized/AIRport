import { TerminalAgt } from './TerminalAgt';
import { User } from './User';
import { UserTerminal } from './UserTerminal';
import { UserTerminalAgt } from './UserTerminalAgt';
export declare type TmTerminal_Id = number;
export declare type Terminal_IsLocal = boolean;
export declare type Terminal_UuId = string;
/**
 *
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 *
 */
export declare class Terminal {
    id: TmTerminal_Id;
    uuId: Terminal_UuId;
    owner: User;
    isLocal: Terminal_IsLocal;
    terminalAgts: TerminalAgt[];
    userTerminal: UserTerminal[];
    userTerminalAgt: UserTerminalAgt[];
}
//# sourceMappingURL=Terminal.d.ts.map