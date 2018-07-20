import { IUser } from "../../generated/infrastructure/quser";
export declare type TerminalId = number;
export declare type TerminalIsLocal = boolean;
export declare type TerminalName = string;
export declare type TerminalSecondId = number;
export declare class Terminal {
    id: TerminalId;
    name: TerminalName;
    secondId: TerminalSecondId;
    owner: IUser;
    isLocal: TerminalIsLocal;
}
