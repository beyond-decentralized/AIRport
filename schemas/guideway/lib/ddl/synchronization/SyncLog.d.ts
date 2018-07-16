import { AgtSharingMessage } from "./AgtSharingMessage";
import { AgtRepositoryTransactionBlock } from "./AgtRepositoryTransactionBlock";
/**
 * A record of syncing a particular record to a particular terminal.
 */
export declare class SyncLog {
    sharingMessage: AgtSharingMessage;
    repositoryTransactionBlock: AgtRepositoryTransactionBlock;
}
