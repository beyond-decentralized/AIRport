import { SharingNode_Id, SharingNode_IsActive, SharingNode_SyncFrequency } from '../../ddl/ddl';
import { BaseSharingNodeDao, ISharingNode } from '../../generated/generated';
export interface ISharingNodeDao {
    findAllGroupedBySyncFrequency(): Promise<Map<SharingNode_SyncFrequency, ISharingNode[]>>;
    updateIsActive(sharingNodeIds: SharingNode_Id[], isActive: SharingNode_IsActive): Promise<void>;
}
export declare class SharingNodeDao extends BaseSharingNodeDao implements ISharingNodeDao {
    findAllGroupedBySyncFrequency(): Promise<Map<SharingNode_SyncFrequency, ISharingNode[]>>;
    updateIsActive(sharingNodeIds: SharingNode_Id[], isActive: SharingNode_IsActive): Promise<void>;
}
//# sourceMappingURL=SharingNodeDao.d.ts.map