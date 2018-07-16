import { RepoTransBlockSyncOutcomeType, TmRepositoryTransactionBlockId } from "@airport/arrivals-n-departures";
import { SharingNodeId } from "./SharingNode";
export declare class SharingNodeRepoTransBlockStage {
    sharingNodeId: SharingNodeId;
    repositoryTransactionBlockId: TmRepositoryTransactionBlockId;
    syncOutcomeType: RepoTransBlockSyncOutcomeType;
}
