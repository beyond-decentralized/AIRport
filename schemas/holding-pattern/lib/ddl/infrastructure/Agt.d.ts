import { TerminalAgt } from './TerminalAgt';
export declare type AgtId = number;
export declare type AgtAddress = string;
export declare class Agt {
    id: AgtId;
    address: AgtAddress;
    terminalAgts: TerminalAgt[];
}
