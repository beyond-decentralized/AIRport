import { IUtils } from "@airport/air-control";
import { ActorId, IActor, IActorDao, IRecordHistory, IRepositoryTransactionHistoryDao, IRepositoryTransactionHistoryDmo, RecordHistoryId, RepositoryEntityActorRecordId, RepositoryId } from "@airport/holding-pattern";
import { ISyncInUtils, ISyncRepoTransHistory, Stage1SyncedInDataProcessingResult } from "./SyncInUtils";
/**
 * Stage 1 data processor is used to
 *
 *  1)  Generate unique create/update/delete statement datastructures
 *  2)  Generate synchronization conflict datastructure
 */
export interface IStage1SyncedInDataProcessor {
    performStage1DataProcessing(repoTransHistoryMapByRepositoryId: Map<RepositoryId, ISyncRepoTransHistory[]>, actorMayById: Map<ActorId, IActor>): Promise<Stage1SyncedInDataProcessingResult>;
}
export declare class Stage1SyncedInDataProcessor implements IStage1SyncedInDataProcessor {
    private actorDao;
    private repositoryTransactionHistoryDao;
    private repositoryTransactionHistoryDmo;
    private syncInUtils;
    private utils;
    constructor(actorDao: IActorDao, repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao, repositoryTransactionHistoryDmo: IRepositoryTransactionHistoryDmo, syncInUtils: ISyncInUtils, utils: IUtils);
    /**
     * In stage one:
     *
     *  1)  Unique create/update/delete statement datastructures are generated
     *  2)  Synchronization conflict datastructure is generated
     *
     * @param {Map<RepositoryId, ISyncRepoTransHistory[]>} repoTransHistoryMapByRepositoryId
     * @param {Map<ActorId, IActor>} actorMayById
     * @returns {Promise<void>}
     */
    performStage1DataProcessing(repoTransHistoryMapByRepositoryId: Map<RepositoryId, ISyncRepoTransHistory[]>, actorMayById: Map<ActorId, IActor>): Promise<Stage1SyncedInDataProcessingResult>;
    ensureRecordHistoryId(recordHistory: IRecordHistory, actorRecordIdSetByActor: Map<ActorId, Map<RepositoryEntityActorRecordId, RecordHistoryId>>, actorRecordId?: RepositoryEntityActorRecordId): void;
    private getDeletedRecordIds(allRepoTransHistoryMapByRepoId, repoTransHistoryMapByRepoId, isLocal?);
    private mergeArraysInMap(map, key, array);
    private processCreation(repositoryId, operationHistory, isLocal, recordCreations, recordUpdates, recordDeletions, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId);
    private processUpdate(repositoryId, operationHistory, isLocal, recordCreations, recordUpdates, allRemoteRecordDeletions, allLocalRecordDeletions, syncConflictMapByRepoId);
    private processDeletion(repositoryId, operationHistory, recordCreations, recordUpdates, recordDeletions, allLocalRecordDeletions);
    private getRecordsForRepoInTable<T>(repositoryId, operationHistory, recordMapBySchemaTableAndRepository);
    private getRecord(recordHistory, recordMapByActor);
    private hasRecordId(recordHistory, actorRecordIdSetByActor);
    private getRecordHistoryId(recordHistory, actorRecordIdSetByActor);
    private getRecordsForActor<T>(recordHistory, recordMapByActor);
    private getRecordInfo(repositoryId, operationHistory, recordHistory);
    private addSyncConflict(synchronizationConflictType, repositoryId, overwrittenRecordHistory, overwritingRecordHistory, syncConflictMapByRepoId);
    private createSynchronizationConflict(synchronizationConflictType, repositoryId, overwrittenRecordHistory, overwritingRecordHistory);
    private ensureColumnValueMap(recordHistory, dataMap);
    private ensureRecord(recordHistory, recordMapByActor);
}
