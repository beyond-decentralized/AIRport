import { IUtils } from "@airport/air-control";
import { DatabaseId } from "@airport/holding-pattern";
import { SharingNodeId } from "../../ddl/ddl";
import { BaseSharingNodeDatabaseDao, IBaseSharingNodeDatabaseDao, ISharingNodeDatabase } from "../../generated/generated";
export interface ISharingNodeDatabaseDao extends IBaseSharingNodeDatabaseDao {
    findBySharingNodeDbMapByDatabaseIdAndSharingNodeIds(databaseId: DatabaseId, sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, ISharingNodeDatabase>>;
}
export declare class SharingNodeDatabaseDao extends BaseSharingNodeDatabaseDao implements ISharingNodeDatabaseDao {
    constructor(utils: IUtils);
    findBySharingNodeDbMapByDatabaseIdAndSharingNodeIds(databaseId: DatabaseId, sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, ISharingNodeDatabase>>;
}
