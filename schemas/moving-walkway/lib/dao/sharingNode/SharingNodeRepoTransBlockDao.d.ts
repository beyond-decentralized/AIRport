import { SharingNodeRepoTransBlockSyncStatus, TmRepositoryTransactionBlockId } from '@airport/arrivals-n-departures';
import { SharingNodeId } from '../../ddl/ddl';
import { BaseSharingNodeRepoTransBlockDao, IBaseSharingNodeRepoTransBlockDao, ISharingNodeRepoTransBlock } from '../../generated/generated';
export declare type SharingNodeRepoTransBlockValues = [SharingNodeId, TmRepositoryTransactionBlockId, SharingNodeRepoTransBlockSyncStatus];
export interface RepoTransBlocksForSharingNodes {
    repositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId>;
    repoTransBlocksBySharingNodeId: Map<SharingNodeId, TmRepositoryTransactionBlockId[]>;
}
export interface ISharingNodeRepoTransBlockDao extends IBaseSharingNodeRepoTransBlockDao {
    findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds: SharingNodeId[], repoTransBlockIds: TmRepositoryTransactionBlockId[]): Promise<Map<SharingNodeId, Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>>;
    updateFromResponseStage(): Promise<number>;
    updateBlockSyncStatus(sharingNodeIds: SharingNodeId[], repoTransBlockIds: TmRepositoryTransactionBlockId[], existingSyncStatus: SharingNodeRepoTransBlockSyncStatus, newSyncStatus: SharingNodeRepoTransBlockSyncStatus): Promise<void>;
    insertValues(values: SharingNodeRepoTransBlockValues[]): Promise<number>;
    getForSharingNodeIdsAndBlockStatus(sharingNodeIds: SharingNodeId[], syncStatus: SharingNodeRepoTransBlockSyncStatus): Promise<RepoTransBlocksForSharingNodes>;
}
export declare class SharingNodeRepoTransBlockDao extends BaseSharingNodeRepoTransBlockDao implements ISharingNodeRepoTransBlockDao {
    findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds: SharingNodeId[], repoTransBlockIds: TmRepositoryTransactionBlockId[]): Promise<Map<SharingNodeId, Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>>;
    updateFromResponseStage(): Promise<number>;
    updateBlockSyncStatus(sharingNodeIds: SharingNodeId[], repoTransBlockIds: TmRepositoryTransactionBlockId[], existingSyncStatus: SharingNodeRepoTransBlockSyncStatus, newSyncStatus: SharingNodeRepoTransBlockSyncStatus): Promise<void>;
    insertValues(values: SharingNodeRepoTransBlockValues[]): Promise<number>;
    getForSharingNodeIdsAndBlockStatus(sharingNodeIds: SharingNodeId[], syncStatus: SharingNodeRepoTransBlockSyncStatus): Promise<RepoTransBlocksForSharingNodes>;
}
