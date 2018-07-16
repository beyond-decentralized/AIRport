import { RepositoryTransactionBlock } from "../repositoryTransactionBlock/RepositoryTransactionBlock";
import { SharingMessage } from "./SharingMessage";
/**
 * A given Repo Trans block can be send via multiple messages (to multiple AGTs).
 */
export declare class SharingMessageRepoTransBlock {
    sharingMessage: SharingMessage;
    repositoryTransactionBlock: RepositoryTransactionBlock;
}
