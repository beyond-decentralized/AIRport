import { AgtRepositoryId } from '@airport/arrivals-n-departures';
import { IRepositoryTransactionHistory, Repository_Id } from '@airport/holding-pattern';
import { SharingNodeId } from '../../ddl/ddl';
import { BaseSharingNodeRepositoryDao, ISharingNodeRepository } from '../../generated/generated';
export interface ISharingNodeRepositoryDao {
    findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds: Repository_Id[], sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, Map<Repository_Id, ISharingNodeRepository>>>;
    findBySharingNodeAndAgtRepositoryIds(sharingNodeIds: SharingNodeId[], agtRepositoryIds: AgtRepositoryId[]): Promise<Map<SharingNodeId, Map<AgtRepositoryId, Repository_Id>>>;
    findNewRepoTransHistoriesForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<[
        Map<Repository_Id, Set<SharingNodeId>>,
        IRepositoryTransactionHistory[]
    ]>;
}
export declare class SharingNodeRepositoryDao extends BaseSharingNodeRepositoryDao implements ISharingNodeRepositoryDao {
    findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds: Repository_Id[], sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, Map<Repository_Id, ISharingNodeRepository>>>;
    findBySharingNodeAndAgtRepositoryIds(sharingNodeIds: SharingNodeId[], agtRepositoryIds: AgtRepositoryId[]): Promise<Map<SharingNodeId, Map<AgtRepositoryId, Repository_Id>>>;
    findNewRepoTransHistoriesForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<[
        Map<Repository_Id, Set<SharingNodeId>>,
        IRepositoryTransactionHistory[]
    ]>;
}
//# sourceMappingURL=SharingNodeRepositoryDao.d.ts.map