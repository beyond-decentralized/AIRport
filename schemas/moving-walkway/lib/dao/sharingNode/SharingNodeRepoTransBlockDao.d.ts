import { SharingNodeRepoTransBlockSyncStatus, TmRepositoryTransactionBlockId } from '@airport/arrivals-n-departures';
import { SharingNode_Id } from '../../ddl/ddl';
import { BaseSharingNodeRepoTransBlockDao, IBaseSharingNodeRepoTransBlockDao, ISharingNodeRepoTransBlock } from '../../generated/generated';
export declare type SharingNodeRepoTransBlockValues = [
    SharingNode_Id,
    TmRepositoryTransactionBlockId,
    SharingNodeRepoTransBlockSyncStatus
];
export interface RepoTransBlocksForSharingNodes {
    repositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId>;
    repoTransBlocksBySharingNodeId: Map<SharingNode_Id, TmRepositoryTransactionBlockId[]>;
}
export interface ISharingNodeRepoTransBlockDao extends IBaseSharingNodeRepoTransBlockDao {
    findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds: SharingNode_Id[], repoTransBlockIds: TmRepositoryTransactionBlockId[]): Promise<Map<SharingNode_Id, Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>>;
    updateFromResponseStage(): Promise<number>;
    updateBlockSyncStatus(sharingNodeIds: SharingNode_Id[], repoTransBlockIds: TmRepositoryTransactionBlockId[], existingSyncStatus: SharingNodeRepoTransBlockSyncStatus, newSyncStatus: SharingNodeRepoTransBlockSyncStatus): Promise<void>;
    insertValues(values: SharingNodeRepoTransBlockValues[]): Promise<number>;
    getForSharingNodeIdsAndBlockStatus(sharingNodeIds: SharingNode_Id[], syncStatus: SharingNodeRepoTransBlockSyncStatus): Promise<RepoTransBlocksForSharingNodes>;
}
export declare class SharingNodeRepoTransBlockDao extends BaseSharingNodeRepoTransBlockDao implements ISharingNodeRepoTransBlockDao {
    findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds: SharingNode_Id[], repoTransBlockIds: TmRepositoryTransactionBlockId[]): Promise<Map<SharingNode_Id, Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>>;
    updateFromResponseStage(): Promise<number>;
    updateBlockSyncStatus(sharingNodeIds: SharingNode_Id[], repoTransBlockIds: TmRepositoryTransactionBlockId[], existingSyncStatus: SharingNodeRepoTransBlockSyncStatus, newSyncStatus: SharingNodeRepoTransBlockSyncStatus): Promise<void>;
    insertValues(values: SharingNodeRepoTransBlockValues[]): Promise<number>;
    getForSharingNodeIdsAndBlockStatus(sharingNodeIds: SharingNode_Id[], syncStatus: SharingNodeRepoTransBlockSyncStatus): Promise<RepoTransBlocksForSharingNodes>;
}
//# sourceMappingURL=SharingNodeRepoTransBlockDao.d.ts.map