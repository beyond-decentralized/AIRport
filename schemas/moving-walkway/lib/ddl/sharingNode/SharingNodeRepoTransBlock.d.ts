import { RepoTransBlockSyncOutcomeType } from "@airport/arrivals-n-departures";
import { BlockSyncStatus } from "@airport/terminal-map";
import { RepositoryTransactionBlock } from "../repositoryTransactionBlock/RepositoryTransactionBlock";
import { SharingMessageSyncTimestamp } from "../sharingMessage/SharingMessage";
import { DataOrigin } from "../values/DataOrigin";
import { SharingNode } from "./SharingNode";
/**
 * Every RepositoryTransactionBlock has an Id at every AGT that syncs
 * it.  This record stores that Id.
 */
export declare class SharingNodeRepoTransBlock {
    sharingNode: SharingNode;
    repositoryTransactionBlock: RepositoryTransactionBlock;
    syncTimestamp: SharingMessageSyncTimestamp;
    syncOutcomeType: RepoTransBlockSyncOutcomeType;
    origin: DataOrigin;
    blockSyncStatus: BlockSyncStatus;
}
