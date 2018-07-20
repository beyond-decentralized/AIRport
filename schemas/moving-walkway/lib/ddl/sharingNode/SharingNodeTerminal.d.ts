import { TerminalPassword, TerminalId } from "@airport/arrivals-n-departures";
import { ITerminal } from "@airport/holding-pattern";
import { TerminalSyncStatus } from "@airport/ground-control";
import { SharingNode } from "./SharingNode";
export declare class SharingNodeTerminal {
    sharingNode: SharingNode;
    terminal: ITerminal;
    agtTerminalId: TerminalId;
    agtTerminalPassword: TerminalPassword;
    terminalSyncStatus: TerminalSyncStatus;
}
