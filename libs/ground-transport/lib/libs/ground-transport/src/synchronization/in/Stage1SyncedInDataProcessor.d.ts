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
    private getDeletedRecordIds;
    private mergeArraysInMap;
    private processCreation;
    private processUpdate;
    private processDeletion;
    private getRecordsForRepoInTable;
    private getRecord;
    private hasRecordId;
    private getRecordHistoryId;
    private getRecordsForActor;
    ensureRecordHistoryId(recordHistory: IRecordHistory, actorRecordIdSetByActor: Map<ActorId, Map<RepositoryEntityActorRecordId, RecordHistoryId>>, actorRecordId?: RepositoryEntityActorRecordId): void;
    private getRecordInfo;
    private addSyncConflict;
    private createSynchronizationConflict;
    private ensureColumnValueMap;
    private ensureRecord;
}
