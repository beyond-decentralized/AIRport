import { TmSharingMessageId } from '@airport/arrivals-n-departures';
import { SharingNode_Id } from '../../ddl/ddl';
import { BaseSharingMessageDao, IBaseSharingMessageDao } from '../../generated/generated';
export interface ISharingMessageDao extends IBaseSharingMessageDao {
    findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds: SharingNode_Id[]): Promise<Map<SharingNode_Id, TmSharingMessageId[]>>;
}
export declare class SharingMessageDao extends BaseSharingMessageDao implements ISharingMessageDao {
    findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds: SharingNode_Id[]): Promise<Map<SharingNode_Id, TmSharingMessageId[]>>;
}
//# sourceMappingURL=SharingMessageDao.d.ts.map