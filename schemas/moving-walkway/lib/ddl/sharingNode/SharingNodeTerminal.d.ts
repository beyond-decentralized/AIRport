import { TerminalPassword, TerminalId } from "@airport/arrivals-n-departures";
import { TerminalSyncStatus } from "@airport/ground-control";
import { ITerminal } from '@airport/travel-document-checkpoint';
import { SharingNode } from "./SharingNode";
export declare class SharingNodeTerminal {
    sharingNode: SharingNode;
    terminal: ITerminal;
    agtTerminalId: TerminalId;
    agtTerminalPassword: TerminalPassword;
    terminalSyncStatus: TerminalSyncStatus;
}
//# sourceMappingURL=SharingNodeTerminal.d.ts.map