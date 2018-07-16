import { IAirportDatabase, IUtils } from "@airport/air-control";
import { TmSharingMessageId } from "@airport/arrivals-n-departures";
import { IRecordHistoryNewValueDao, IRecordHistoryOldValueDao, IRepositoryTransactionHistoryDao } from "@airport/holding-pattern";
import { SharingNodeId } from "../../ddl/ddl";
import { BaseSharingMessageDao, IBaseSharingMessageDao } from "../../generated/generated";
export interface ISharingMessageDao extends IBaseSharingMessageDao {
    findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, TmSharingMessageId[]>>;
}
export declare class SharingMessageDao extends BaseSharingMessageDao implements ISharingMessageDao {
    private airportDb;
    private repositoryTransactionHistoryDao;
    private recordHistoryNewValueDao;
    private recordHistoryOldValueDao;
    constructor(airportDb: IAirportDatabase, repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao, recordHistoryNewValueDao: IRecordHistoryNewValueDao, recordHistoryOldValueDao: IRecordHistoryOldValueDao, utils: IUtils);
    findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds: SharingNodeId[]): Promise<Map<SharingNodeId, TmSharingMessageId[]>>;
}
