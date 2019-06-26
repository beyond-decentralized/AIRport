import { AgtRepositoryId, MessageFromTM } from '@airport/arrivals-n-departures';
import { IRepository, RepositoryId, RepositoryTransactionHistoryId } from '@airport/holding-pattern';
import { ISharingNode, ISharingNodeTerminal, RepositoryTransactionBlockData, SharingNodeId } from '@airport/moving-walkway';
import { ITerminal } from '@airport/travel-document-checkpoint';
export interface ISyncOutSerializer {
    serializeMessages(sharingNodeDbMap: Map<SharingNodeId, ISharingNodeTerminal>, sharingNodeMap: Map<SharingNodeId, ISharingNode>, repoMapBySharingNodeAndRepoIds: Map<SharingNodeId, Map<RepositoryId, [IRepository, AgtRepositoryId]>>, repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>, repoTransHistoryIds: Set<RepositoryTransactionHistoryId>, terminal: ITerminal): Promise<Map<SharingNodeId, MessageFromTM>>;
}
export declare class SyncOutSerializer implements ISyncOutSerializer {
    serializeMessages(sharingNodeDbMap: Map<SharingNodeId, ISharingNodeTerminal>, sharingNodeMap: Map<SharingNodeId, ISharingNode>, repoMapBySharingNodeAndRepoIds: Map<SharingNodeId, Map<RepositoryId, [IRepository, AgtRepositoryId]>>, repoTransBlockDataByRepoId: Map<RepositoryId, RepositoryTransactionBlockData>, repoTransHistoryIds: Set<RepositoryTransactionHistoryId>, terminal: ITerminal): Promise<Map<SharingNodeId, MessageFromTM>>;
}
