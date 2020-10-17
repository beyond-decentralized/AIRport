import { SharingNodeRepoTransBlockSyncStatus } from "@airport/arrivals-n-departures";
import { RepositoryTransactionBlock } from "../repositoryTransactionBlock/RepositoryTransactionBlock";
import { SharingNode } from "./SharingNode";
/**
 * Every RepositoryTransactionBlock has an Id at every AGT that syncs
 * it.  This record stores that Id.
 */
export declare class SharingNodeRepoTransBlock {
    sharingNode: SharingNode;
    repositoryTransactionBlock: RepositoryTransactionBlock;
    syncStatus: SharingNodeRepoTransBlockSyncStatus;
}
//# sourceMappingURL=SharingNodeRepoTransBlock.d.ts.map