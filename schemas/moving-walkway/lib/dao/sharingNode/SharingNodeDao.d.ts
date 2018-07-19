import { IUtils } from "@airport/air-control";
import { SharingNodeId, SharingNodeIsActive, SharingNodeSyncFrequency } from "../../ddl/ddl";
import { BaseSharingNodeDao, ISharingNode } from "../../generated/generated";
export interface ISharingNodeDao {
    findAllGroupedBySyncFrequency(): Promise<Map<SharingNodeSyncFrequency, ISharingNode[]>>;
    updateIsActive(sharingNodeIds: SharingNodeId[], isActive: SharingNodeIsActive): Promise<void>;
}
export declare class SharingNodeDao extends BaseSharingNodeDao implements ISharingNodeDao {
    constructor(utils: IUtils);
    findAllGroupedBySyncFrequency(): Promise<Map<SharingNodeSyncFrequency, ISharingNode[]>>;
    updateIsActive(sharingNodeIds: SharingNodeId[], isActive: SharingNodeIsActive): Promise<void>;
}
