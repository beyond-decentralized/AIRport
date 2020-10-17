import { TmSharingMessageId } from '@airport/arrivals-n-departures';
import { SharingNodeId } from '../../ddl/ddl';
import { BaseSharingMessageDao, IBaseSharingMessageDao } from '../../generated/generated';
export interface ISharingMessageDao extends IBaseSharingMessageDao {
    findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, TmSharingMessageId[]>>;
}
export declare class SharingMessageDao extends BaseSharingMessageDao implements ISharingMessageDao {
    findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, TmSharingMessageId[]>>;
}
//# sourceMappingURL=SharingMessageDao.d.ts.map