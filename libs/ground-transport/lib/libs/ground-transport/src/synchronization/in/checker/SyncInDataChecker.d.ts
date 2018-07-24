import { IUtils } from "@airport/air-control";
import { ActorId, IRecordHistory, IRepositoryTransactionHistoryDao, RepositoryEntityActorRecordId } from "@airport/holding-pattern";
import { IMissingRecordDao, IMissingRecordRepoTransBlockDao, ISharingMessageDao } from "@airport/moving-walkway";
import { ISyncInRepositoryTransactionBlockCreator } from "../creator/SyncInRepositoryTransactionBlockCreator";
import { DataCheckResults, IDataToTM, ISyncInUtils } from "../SyncInUtils";
export interface ISyncInDataChecker {
    checkData(dataMessagesWithCompatibleSchemas: IDataToTM[]): Promise<DataCheckResults>;
}
export declare class SyncInDataChecker implements ISyncInDataChecker {
    private missingRecordDao;
    private missingRecordRepoTransBlockDao;
    private repositoryTransactionHistoryDao;
    private sharingMessageDao;
    private syncInRepositoryTransactionBlockCreator;
    private syncInUtils;
    private utils;
    constructor(missingRecordDao: IMissingRecordDao, missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao, repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao, sharingMessageDao: ISharingMessageDao, syncInRepositoryTransactionBlockCreator: ISyncInRepositoryTransactionBlockCreator, syncInUtils: ISyncInUtils, utils: IUtils);
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    checkData(dataMessagesWithCompatibleSchemas: IDataToTM[]): Promise<DataCheckResults>;
    private getInsertedRecordMap;
    ensureRecordId(recordHistory: IRecordHistory, actorRecordIdSetByActor: Map<ActorId, Set<RepositoryEntityActorRecordId>>, actorRecordId?: RepositoryEntityActorRecordId): void;
    private recordMissingRecordAndSharingMessageRelations;
    private createMissingRecord;
    private getExistingRepoTransBlocksWithCompatibleSchemasAndData;
}
