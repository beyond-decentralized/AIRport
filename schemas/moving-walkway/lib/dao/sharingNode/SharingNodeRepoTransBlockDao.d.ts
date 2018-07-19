import { IAirportDatabase } from "@airport/air-control/lib/lingo/AirportDatabase";
import { IUtils } from "@airport/air-control/lib/lingo/utils/Utils";
import { RepoTransBlockSyncOutcomeType, TmRepositoryTransactionBlockId } from "@airport/arrivals-n-departures";
import { BlockSyncStatus } from "@airport/ground-control";
import { SharingNodeId } from "../../ddl/ddl";
import { SharingMessageSyncTimestamp } from "../../ddl/sharingMessage/SharingMessage";
import { DataOrigin } from "../../ddl/values/DataOrigin";
import { BaseSharingNodeRepoTransBlockDao, IBaseSharingNodeRepoTransBlockDao, ISharingNodeRepoTransBlock } from "../../generated/generated";
export declare type SharingNodeRepoTransBlockValues = [SharingNodeId, TmRepositoryTransactionBlockId, SharingMessageSyncTimestamp, RepoTransBlockSyncOutcomeType, DataOrigin, BlockSyncStatus];
export interface RepoTransBlocksForSharingNodes {
    repositoryTransactionBlockIds: Set<TmRepositoryTransactionBlockId>;
    repoTransBlocksBySharingNodeId: Map<SharingNodeId, TmRepositoryTransactionBlockId[]>;
}
export interface ISharingNodeRepoTransBlockDao extends IBaseSharingNodeRepoTransBlockDao {
    findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds: SharingNodeId[], repoTransBlockIds: TmRepositoryTransactionBlockId[]): Promise<Map<SharingNodeId, Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>>;
    updateFromResponseStage(): Promise<number>;
    updateBlockSyncStatus(sharingNodeIds: SharingNodeId[], repoTransBlockIds: TmRepositoryTransactionBlockId[], existingBlockSyncStatus: BlockSyncStatus, newBlockSyncStatus: BlockSyncStatus): Promise<void>;
    insertValues(values: SharingNodeRepoTransBlockValues[]): Promise<number>;
    getForSharingNodeIdsAndBlockStatus(sharingNodeIds: SharingNodeId[], blockSyncStatus: BlockSyncStatus): Promise<RepoTransBlocksForSharingNodes>;
}
export declare class SharingNodeRepoTransBlockDao extends BaseSharingNodeRepoTransBlockDao implements ISharingNodeRepoTransBlockDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(sharingNodeIds: SharingNodeId[], repoTransBlockIds: TmRepositoryTransactionBlockId[]): Promise<Map<SharingNodeId, Map<TmRepositoryTransactionBlockId, ISharingNodeRepoTransBlock>>>;
    updateFromResponseStage(): Promise<number>;
    updateBlockSyncStatus(sharingNodeIds: SharingNodeId[], repoTransBlockIds: TmRepositoryTransactionBlockId[], existingBlockSyncStatus: BlockSyncStatus, newBlockSyncStatus: BlockSyncStatus): Promise<void>;
    insertValues(values: SharingNodeRepoTransBlockValues[]): Promise<number>;
    getForSharingNodeIdsAndBlockStatus(sharingNodeIds: SharingNodeId[], blockSyncStatus: BlockSyncStatus): Promise<RepoTransBlocksForSharingNodes>;
}
