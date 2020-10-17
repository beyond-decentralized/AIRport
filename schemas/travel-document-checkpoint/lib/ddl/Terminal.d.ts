import { TerminalName, TerminalSecondId } from '@airport/arrivals-n-departures';
import { TerminalAgt } from './TerminalAgt';
import { User } from './User';
import { UserTerminal } from './UserTerminal';
import { UserTerminalAgt } from './UserTerminalAgt';
export declare type TmTerminalId = number;
export declare type TerminalIsLocal = boolean;
export declare class Terminal {
    id: TmTerminalId;
    name: TerminalName;
    secondId: TerminalSecondId;
    owner: User;
    isLocal: TerminalIsLocal;
    terminalAgts: TerminalAgt[];
    userTerminal: UserTerminal[];
    userTerminalAgt: UserTerminalAgt[];
}
//# sourceMappingURL=Terminal.d.ts.map