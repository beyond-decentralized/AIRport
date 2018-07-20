import { ISharingNode, ISharingNodeTerminal, RepositoryTransactionBlockData, SharingNodeId } from "@airport/moving-walkway";
import { ITerminal, IRepository, RepositoryId, RepositoryTransactionHistoryId } from "@airport/holding-pattern";
import { AgtRepositoryId, MessageFromClient } from "@airport/ground-control";
export interface ISyncOutSerializer {
    serializeMessages(sharingNodeDbMap: Map<SharingNodeId, ISharingNodeTerminal>, sharingNodeMap: Map<SharingNodeId, ISharingNode>, repoMapBySharingNodeAndRepoIds: Map<SharingNodeId, Map<RepositoryId, [IRepository, AgtRepositoryId]>>, repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>, repoTransHistoryIds: Set<RepositoryTransactionHistoryId>, terminal: ITerminal): Promise<Map<SharingNodeId, MessageFromClient>>;
}
export declare class SyncOutSerializer implements ISyncOutSerializer {
    serializeMessages(sharingNodeDbMap: Map<SharingNodeId, ISharingNodeTerminal>, sharingNodeMap: Map<SharingNodeId, ISharingNode>, repoMapBySharingNodeAndRepoIds: Map<SharingNodeId, Map<RepositoryId, [IRepository, AgtRepositoryId]>>, repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>, repoTransHistoryIds: Set<RepositoryTransactionHistoryId>, terminal: ITerminal): Promise<Map<SharingNodeId, MessageFromClient>>;
}
