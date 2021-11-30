import { Actor_Id, IActor, IRecordHistory, RecordHistoryId, RepositoryEntity_ActorRecordId, Repository_Id } from '@airport/holding-pattern';
import { ISyncRepoTransHistory, Stage1SyncedInDataProcessingResult } from './SyncInUtils';
/**
 * Stage 1 data processor is used to
 *
 *  1)  Generate unique create/update/delete statement datastructures
 *  2)  Generate synchronization conflict datastructure
 */
export interface IStage1SyncedInDataProcessor {
    performStage1DataProcessing(repoTransHistoryMapByRepositoryId: Map<Repository_Id, ISyncRepoTransHistory[]>, actorMayById: Map<Actor_Id, IActor>): Promise<Stage1SyncedInDataProcessingResult>;
}
export declare class Stage1SyncedInDataProcessor implements IStage1SyncedInDataProcessor {
    /**
     * In stage one:
     *
     *  1)  Unique create/update/delete statement datastructures are generated
     *  2)  Synchronization conflict datastructure is generated
     *
     * @param {Map<RepositoryId, ISyncRepoTransHistory[]>} repoTransHistoryMapByRepositoryId
     * @param {Map<Actor_Id, IActor>} actorMayById
     * @returns {Promise<void>}
     */
    performStage1DataProcessing(repoTransHistoryMapByRepositoryId: Map<Repository_Id, ISyncRepoTransHistory[]>, actorMayById: Map<Actor_Id, IActor>): Promise<Stage1SyncedInDataProcessingResult>;
    ensureRecordHistoryId(recordHistory: IRecordHistory, actorRecordIdSetByActor: Map<Actor_Id, Map<RepositoryEntity_ActorRecordId, RecordHistoryId>>, actorRecordId?: RepositoryEntity_ActorRecordId): void;
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
    private getRecordInfo;
    private addSyncConflict;
    private createSynchronizationConflict;
    private ensureColumnValueMap;
    private ensureRecord;
}
//# sourceMappingURL=Stage1SyncedInDataProcessor.d.ts.map