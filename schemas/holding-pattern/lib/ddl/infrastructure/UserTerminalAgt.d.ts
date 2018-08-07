import { TerminalAgt } from './TerminalAgt';
import { User } from './User';
export declare type UserTerminalAgtPassword = number;
export declare type UserTerminalAgtId = number;
export declare type UserTerminalAgtAgtId = number;
/**
 * User needs some sort of password that can be used to verify that
 * a given user is indeed making changes (instead of another one).
 *
 * The password should be AGT specific and Terminal specific
 * to reduce security risks.
 *
 * The password is generated as soon as a user is verified with
 * a terminal and then subsequently registered with an AGT (on
 * the next transaction)
 *
 * Registration is made using an already known to AGT Terminal
 * Id and password, to verify that is indeed coming from the
 * specified terminal.
 *
 * FIXME: additional credentials are needed for User-Agt registration
 * see of OpenConnect can provide something verifiable with the
 * provider
 */
export declare class UserTerminalAgt {
    id: UserTerminalAgtId;
    agtId: UserTerminalAgtAgtId;
    password: UserTerminalAgtPassword;
    user: User;
    terminalAgt: TerminalAgt;
}
