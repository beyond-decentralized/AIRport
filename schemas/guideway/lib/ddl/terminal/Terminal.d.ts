import { TerminalId, TerminalPassword } from "@airport/arrivals-n-departures";
import { AgtSharingMessage } from "../synchronization/AgtSharingMessage";
import { User } from "../user/User";
import { TerminalRepository } from "./TerminalRepository";
export declare type TerminalLastPollConnectionDatetime = number;
export declare type TerminalLastSseConnectionDatetime = number;
/**
 * Represents the client-side terminal.
 */
export declare class Terminal {
    id: TerminalId;
    password: TerminalPassword;
    lastPollConnectionDatetime: TerminalLastPollConnectionDatetime;
    lastSseConnectionDatetime: TerminalLastSseConnectionDatetime;
    user: User;
    terminalRepositories: TerminalRepository[];
    sharingMessages: AgtSharingMessage[];
}
