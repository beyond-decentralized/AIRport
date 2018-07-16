import { AgtSharingMessageId, TmSharingMessageId } from "@airport/arrivals-n-departures";
import { Terminal } from "../..";
import { AgtSharingMessageAcknowledged } from "./AgtSharingMessageAcknowledged";
import { SyncLog } from "./SyncLog";
/**
 * A AgtSharingMessage record is created everytime the AGT sends a group of sync records
 * to Terminals.  Eventually, when Terminals respond with an ACK of receipt a corresponding
 * group of sync records the state of these records is updated.
 */
export declare class AgtSharingMessage {
    id: AgtSharingMessageId;
    terminal: Terminal;
    tmSharingMessageId: TmSharingMessageId;
    syncLogs: SyncLog[];
    acknowledged: AgtSharingMessageAcknowledged;
}
