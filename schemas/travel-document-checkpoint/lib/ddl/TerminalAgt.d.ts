import { TerminalPassword } from '@airport/arrivals-n-departures';
import { Agt } from './Agt';
import { Terminal } from './Terminal';
import { UserTerminalAgt } from './UserTerminalAgt';
/**
 *
 * DEPRECATED - syncing will now be done via IPFS/Peergos
 *
 */
export declare class TerminalAgt {
    terminal: Terminal;
    agt: Agt;
    password: TerminalPassword;
    userTerminalAgts: UserTerminalAgt[];
}
//# sourceMappingURL=TerminalAgt.d.ts.map