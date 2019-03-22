import { AgtRepositoryId } from '@airport/arrivals-n-departures';
import { IRepositoryTransactionHistory, RepositoryId } from '@airport/holding-pattern';
import { SharingNodeId } from '../../ddl/ddl';
import { BaseSharingNodeRepositoryDao, ISharingNodeRepository } from '../../generated/generated';
export interface ISharingNodeRepositoryDao {
    findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds: RepositoryId[], sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, Map<RepositoryId, ISharingNodeRepository>>>;
    findBySharingNodeAndAgtRepositoryIds(sharingNodeIds: SharingNodeId[], agtRepositoryIds: AgtRepositoryId[]): Promise<Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>>;
    findNewRepoTransHistoriesForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<[Map<RepositoryId, Set<SharingNodeId>>, IRepositoryTransactionHistory[]]>;
}
export declare class SharingNodeRepositoryDao extends BaseSharingNodeRepositoryDao implements ISharingNodeRepositoryDao {
    private qMetadataUtils;
    private repoTransHistoryDao;
    private recHistNewValueDao;
    private recHistOldValueDao;
    constructor();
    findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds: RepositoryId[], sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, Map<RepositoryId, ISharingNodeRepository>>>;
    findBySharingNodeAndAgtRepositoryIds(sharingNodeIds: SharingNodeId[], agtRepositoryIds: AgtRepositoryId[]): Promise<Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>>;
    findNewRepoTransHistoriesForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<[Map<RepositoryId, Set<SharingNodeId>>, IRepositoryTransactionHistory[]]>;
}
