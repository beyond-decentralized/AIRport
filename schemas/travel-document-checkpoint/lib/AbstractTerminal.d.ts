import { AbstractUser } from './AbstractUser';
export declare type TerminalId = number;
export declare type TerminalName = string;
export declare type TerminalPassword = string;
export declare type TerminalSecondId = string;
export declare class AbstractTerminal<U extends AbstractUser<any>> {
    id: TerminalId;
    name: TerminalName;
    password: TerminalPassword;
    secondId: TerminalSecondId;
    owner: U;
}
