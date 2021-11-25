import { AgtRepositoryId } from '@airport/arrivals-n-departures';
import { IRepositoryTransactionHistory, Repository_Id } from '@airport/holding-pattern';
import { SharingNode_Id } from '../../ddl/ddl';
import { BaseSharingNodeRepositoryDao, ISharingNodeRepository } from '../../generated/generated';
export interface ISharingNodeRepositoryDao {
    findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds: Repository_Id[], sharingNodeIds: SharingNode_Id[]): Promise<Map<SharingNode_Id, Map<Repository_Id, ISharingNodeRepository>>>;
    findBySharingNodeAndAgtRepositoryIds(sharingNodeIds: SharingNode_Id[], agtRepositoryIds: AgtRepositoryId[]): Promise<Map<SharingNode_Id, Map<AgtRepositoryId, Repository_Id>>>;
    findNewRepoTransHistoriesForSharingNodes(sharingNodeIds: SharingNode_Id[]): Promise<[
        Map<Repository_Id, Set<SharingNode_Id>>,
        IRepositoryTransactionHistory[]
    ]>;
}
export declare class SharingNodeRepositoryDao extends BaseSharingNodeRepositoryDao implements ISharingNodeRepositoryDao {
    findRepositoryMapBySharingNodeAndRepositoryIds(repositoryIds: Repository_Id[], sharingNodeIds: SharingNode_Id[]): Promise<Map<SharingNode_Id, Map<Repository_Id, ISharingNodeRepository>>>;
    findBySharingNodeAndAgtRepositoryIds(sharingNodeIds: SharingNode_Id[], agtRepositoryIds: AgtRepositoryId[]): Promise<Map<SharingNode_Id, Map<AgtRepositoryId, Repository_Id>>>;
    findNewRepoTransHistoriesForSharingNodes(sharingNodeIds: SharingNode_Id[]): Promise<[
        Map<Repository_Id, Set<SharingNode_Id>>,
        IRepositoryTransactionHistory[]
    ]>;
}
//# sourceMappingURL=SharingNodeRepositoryDao.d.ts.map