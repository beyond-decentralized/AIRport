import { IUtils } from '@airport/air-control';
import { EntityId, SchemaVersionId } from '@airport/ground-control';
import { ActorId, IRecordHistory, IRepositoryTransactionHistoryDao, RepositoryEntityActorRecordId, RepositoryId } from '@airport/holding-pattern';
import { IMissingRecord, IMissingRecordDao, IMissingRecordRepoTransBlockDao, IRepositoryTransactionBlock, IRepositoryTransactionBlockDao, ISharingMessageDao } from '@airport/moving-walkway';
import { ITerminalStore } from '@airport/terminal-map';
import { ISyncInRepositoryTransactionBlockCreator } from '../creator/SyncInRepositoryTransactionBlockCreator';
import { IDataToTM, ISyncInUtils } from '../SyncInUtils';
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
    messageIndexMapByRecordToUpdateIds: Map<RepositoryId, Map<SchemaVersionId, Map<EntityId, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>;
    recordsToUpdateMap: Map<RepositoryId, Map<SchemaVersionId, Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
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
    private terminalStore;
    private utils;
    constructor(missingRecordDao: IMissingRecordDao, missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao, repositoryTransactionBlockDao: IRepositoryTransactionBlockDao, repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao, sharingMessageDao: ISharingMessageDao, syncInRepositoryTransactionBlockCreator: ISyncInRepositoryTransactionBlockCreator, syncInUtils: ISyncInUtils, terminalStore: ITerminalStore, utils: IUtils);
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    checkData(dataMessagesWithCompatibleSchemas: IDataToTM[]): Promise<DataCheckResults>;
    private getDataStructuresForChanges;
    private determineMissingRecords;
    private getRecordsToInsertMap;
    ensureRecordId(recordHistory: IRecordHistory, actorRecordIdSetByActor: Map<ActorId, Set<RepositoryEntityActorRecordId>>, actorRecordId?: RepositoryEntityActorRecordId): void;
    private recordMissingRecordAndRepoTransBlockRelations;
    private createMissingRecord;
    private getExistingRepoTransBlocksWithCompatibleSchemasAndData;
}
