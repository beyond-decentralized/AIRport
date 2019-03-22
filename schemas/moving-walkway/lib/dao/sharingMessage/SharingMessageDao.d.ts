import { TmSharingMessageId } from '@airport/arrivals-n-departures';
import { SharingNodeId } from '../../ddl/ddl';
import { BaseSharingMessageDao, IBaseSharingMessageDao } from '../../generated/generated';
export interface ISharingMessageDao extends IBaseSharingMessageDao {
    findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, TmSharingMessageId[]>>;
}
export declare class SharingMessageDao extends BaseSharingMessageDao implements ISharingMessageDao {
    private repoTransHistoryDao;
    private recHistNewValueDao;
    private recHistOldValueDao;
    constructor();
    findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, TmSharingMessageId[]>>;
}
