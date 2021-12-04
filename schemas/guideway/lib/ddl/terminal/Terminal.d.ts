import { AgtSharingMessage } from '../synchronization/AgtSharingMessage';
import { User } from '../user/User';
import { TerminalRepository } from './TerminalRepository';
export declare type TerminalLastPollConnectionDatetime = number;
export declare type TerminalLastSseConnectionDatetime = number;
/**
 * Represents the client-side terminal.
 */
export declare class Terminal {
    id: number;
    name: string;
    secondId: number;
    password: string;
    lastPollConnectionDatetime: TerminalLastPollConnectionDatetime;
    lastSseConnectionDatetime: TerminalLastSseConnectionDatetime;
    user: User;
    terminalRepositories: TerminalRepository[];
    sharingMessages: AgtSharingMessage[];
}
//# sourceMappingURL=Terminal.d.ts.map