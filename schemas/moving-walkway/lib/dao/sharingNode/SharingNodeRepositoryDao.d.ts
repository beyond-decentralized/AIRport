import { IAirportDatabase, IQMetadataUtils, IUtils } from "@airport/air-control";
import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { IRecordHistoryNewValueDao, IRecordHistoryOldValueDao, IRepositoryTransactionHistory, IRepositoryTransactionHistoryDao, RepositoryId } from "@airport/holding-pattern";
import { SharingNodeId } from "../../ddl/ddl";
import { BaseSharingNodeRepositoryDao, ISharingNodeRepository } from "../../generated/generated";
export interface ISharingNodeRepositoryDao {
    findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds: RepositoryId[], sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, Map<RepositoryId, ISharingNodeRepository>>>;
    findBySharingNodeAndAgtRepositoryIds(sharingNodeIds: SharingNodeId[], agtRepositoryIds: AgtRepositoryId[]): Promise<Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>>;
    findNewRepoTransHistoriesForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<[Map<RepositoryId, Set<SharingNodeId>>, IRepositoryTransactionHistory[]]>;
}
export declare class SharingNodeRepositoryDao extends BaseSharingNodeRepositoryDao implements ISharingNodeRepositoryDao {
    private airportDb;
    private qMetadataUtils;
    private repositoryTransactionHistoryDao;
    private recordHistoryNewValueDao;
    private recordHistoryOldValueDao;
    constructor(airportDb: IAirportDatabase, qMetadataUtils: IQMetadataUtils, repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao, recordHistoryNewValueDao: IRecordHistoryNewValueDao, recordHistoryOldValueDao: IRecordHistoryOldValueDao, utils: IUtils);
    findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds: RepositoryId[], sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, Map<RepositoryId, ISharingNodeRepository>>>;
    findBySharingNodeAndAgtRepositoryIds(sharingNodeIds: SharingNodeId[], agtRepositoryIds: AgtRepositoryId[]): Promise<Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>>;
    findNewRepoTransHistoriesForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<[Map<RepositoryId, Set<SharingNodeId>>, IRepositoryTransactionHistory[]]>;
}
