import { IUtils } from "@airport/air-control";
import { SchemaVersionId, TableIndex } from "@airport/ground-control";
import { ActorId, IRecordHistory, IRepositoryTransactionHistoryDao, RepositoryEntityActorRecordId, RepositoryId } from "@airport/holding-pattern";
import { IMissingRecord, IMissingRecordDao, IMissingRecordRepoTransBlockDao, IRepositoryTransactionBlock, IRepositoryTransactionBlockDao, ISharingMessageDao } from "@airport/moving-walkway";
import { ISyncInRepositoryTransactionBlockCreator } from "../creator/SyncInRepositoryTransactionBlockCreator";
import { IDataToTM, ISyncInUtils } from "../SyncInUtils";
export interface DataCheckResults {
    dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
    dataMessagesWithIncompatibleData: IDataToTM[];
    existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[];
    missingRecordDataToTMs: IMissingRecordDataToTM[];
}
export interface IMissingRecordDataToTM {
    missingRecord: IMissingRecord;
    dataMessage: IDataToTM;
}
export interface MissingRecordResults {
    compatibleDataMessageFlags: boolean[];
    missingRecordDataToTMs: IMissingRecordDataToTM[];
}
export interface DataStructuresForChanges {
    messageIndexMapByRecordToUpdateIds: Map<RepositoryId, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>;
    recordToInsertMap: Map<RepositoryId, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
    recordToUpdateMap: Map<RepositoryId, Map<SchemaVersionId, Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
}
export interface ISyncInDataChecker {
    checkData(dataMessagesWithCompatibleSchemas: IDataToTM[]): Promise<DataCheckResults>;
}
export declare class SyncInDataChecker implements ISyncInDataChecker {
    private missingRecordDao;
    private missingRecordRepoTransBlockDao;
    private repositoryTransactionBlockDao;
    private repositoryTransactionHistoryDao;
    private sharingMessageDao;
    private syncInRepositoryTransactionBlockCreator;
    private syncInUtils;
    private utils;
    constructor(missingRecordDao: IMissingRecordDao, missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao, repositoryTransactionBlockDao: IRepositoryTransactionBlockDao, repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao, sharingMessageDao: ISharingMessageDao, syncInRepositoryTransactionBlockCreator: ISyncInRepositoryTransactionBlockCreator, syncInUtils: ISyncInUtils, utils: IUtils);
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    checkData(dataMessagesWithCompatibleSchemas: IDataToTM[]): Promise<DataCheckResults>;
    private getDataStructuresForChanges(dataMessagesWithCompatibleSchemas);
    private determineMissingRecords(dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, recordToUpdateMap, existingRecordIdMap, messageIndexMapByRecordToUpdateIds);
    private getRecordsToInsertMap(dataMessages);
    ensureRecordId(recordHistory: IRecordHistory, actorRecordIdSetByActor: Map<ActorId, Set<RepositoryEntityActorRecordId>>, actorRecordId?: RepositoryEntityActorRecordId): void;
    private recordMissingRecordAndRepoTransBlockRelations(repositoryId, schemaVersionId, tableIndex, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordDataToTMs);
    private createMissingRecord(repositoryId, schemaVersionId, tableIndex, actorId, actorRecordId);
    private getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds);
}
