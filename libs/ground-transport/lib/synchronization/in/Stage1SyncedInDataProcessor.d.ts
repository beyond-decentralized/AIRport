import { IAirportDatabase } from '@airport/air-traffic-control';
import { IContext } from '@airport/direction-indicator';
import { ISequenceGenerator } from '@airport/check-in';
import { Actor_LocalId, IActor, IRecordHistory, RecordHistory_LocalId, AirEntity_ActorRecordId, Repository_LocalId, IActorDao, IRepositoryTransactionHistoryDao, IRepositoryTransactionHistoryDuo } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { ISyncInUtils, ISyncRepoTransHistory, Stage1SyncedInDataProcessingResult } from './SyncInUtils';
/**
 * Stage 1 data processor is used to
 *
 *  1)  Generate unique create/update/delete statement datastructures
 *  2)  Generate synchronization conflict datastructure
 */
export interface IStage1SyncedInDataProcessor {
    performStage1DataProcessing(repositoryTransactionHistoryMapByrepositoryLocalId: Map<Repository_LocalId, ISyncRepoTransHistory[]>, actorMayById: Map<Actor_LocalId, IActor>, context: IContext): Promise<Stage1SyncedInDataProcessingResult>;
}
export declare class Stage1SyncedInDataProcessor implements IStage1SyncedInDataProcessor {
    actorDao: IActorDao;
    airportDatabase: IAirportDatabase;
    repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao;
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    sequenceGenerator: ISequenceGenerator;
    syncInUtils: ISyncInUtils;
    /**
     * In stage one:
     *
     *  1)  Unique create/update/delete statement datastructures are generated
     *  2)  Synchronization conflict datastructure is generated
     *
     * @param {Map<repositoryLocalId, ISyncRepoTransHistory[]>} repositoryTransactionHistoryMapByrepositoryLocalId
     * @param {Map<Actor_LocalId, IActor>} actorMayById
     * @returns {Promise<void>}
     */
    performStage1DataProcessing(repositoryTransactionHistoryMapByrepositoryLocalId: Map<Repository_LocalId, ISyncRepoTransHistory[]>, actorMayById: Map<Actor_LocalId, IActor>, context: IContext): Promise<Stage1SyncedInDataProcessingResult>;
    private populateSystemWideOperationIds;
    ensureRecordHistoryLocalId(recordHistory: IRecordHistory, actorRecordLocalIdSetByActor: Map<Actor_LocalId, Map<AirEntity_ActorRecordId, RecordHistory_LocalId>>, _actorRecordId?: AirEntity_ActorRecordId): void;
    private getDeletedRecordIdsAndPopulateAllHistoryMap;
    private mergeArraysInMap;
    private processCreation;
    private processUpdate;
    private processDeletion;
    private getRecordsForRepoInTable;
    private getRecord;
    private hasRecordId;
    private getRecordHistoryLocalId;
    private getRecordsForActor;
    private getRecordInfo;
    private addSyncConflict;
    private createSynchronizationConflict;
    private ensureColumnValueMap;
    private ensureRecord;
}
//# sourceMappingURL=Stage1SyncedInDataProcessor.d.ts.map