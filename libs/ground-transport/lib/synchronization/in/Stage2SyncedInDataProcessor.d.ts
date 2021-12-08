import { IAirportDatabase, IDatabaseFacade } from '@airport/air-control';
import { ColumnIndex, ApplicationVersionId, TableIndex, DbColumn, DbEntity } from '@airport/ground-control';
import { Actor_Id, RepositoryEntity_ActorRecordId, Repository_Id } from '@airport/holding-pattern';
import { IRecordUpdateStageDao } from '@airport/moving-walkway';
import { IApplication } from '@airport/airspace';
import { RecordUpdate, Stage1SyncedInDataProcessingResult } from './SyncInUtils';
import { IOperationContext } from '@airport/terminal-map';
/**
 * Stage 2 data processor is used to optimize the number of required
 * I/O operations to do applyChangesToDb the terminal I/O (Creates, Updates, Deletes)
 */
export interface IStage2SyncedInDataProcessor {
    applyChangesToDb(stage1Result: Stage1SyncedInDataProcessingResult, applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>): Promise<void>;
}
export declare class Stage2SyncedInDataProcessor implements IStage2SyncedInDataProcessor {
    applyChangesToDb(stage1Result: Stage1SyncedInDataProcessingResult, applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>): Promise<void>;
    /**
     * Remote changes come in with ApplicationVersionIds not ApplicationIndexes, so it makes
     * sense to keep this structure.  NOTE: only one version of a given application is
     * processed at one time:
     *
     *  Changes for a application version below the one in this Terminal must first be upgraded.
     *  Terminal itself must first be upgraded to newer application versions, before changes
     *  for that application version are processed.
     *
     *  To tie in a given ApplicationVersionId to its ApplicationIndex an additional mapping data
     *  structure is passed in.
     */
    performCreates(recordCreations: Map<ApplicationVersionId, Map<TableIndex, Map<Repository_Id, Map<Actor_Id, Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, any>>>>>>, applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>, airDb: IAirportDatabase, dbFacade: IDatabaseFacade, context: IOperationContext): Promise<void>;
    getNonIdColumnsInIndexOrder(dbEntity: DbEntity): DbColumn[];
    performUpdates(recordUpdates: Map<ApplicationVersionId, Map<TableIndex, Map<Repository_Id, Map<Actor_Id, Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>, applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>, recordUpdateStageDao: IRecordUpdateStageDao, context: IOperationContext): Promise<void>;
    performDeletes(recordDeletions: Map<ApplicationVersionId, Map<TableIndex, Map<Repository_Id, Map<Actor_Id, Set<RepositoryEntity_ActorRecordId>>>>>, applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>, airDb: IAirportDatabase, dbFacade: IDatabaseFacade, context: IOperationContext): Promise<void>;
    /**
     * Get the record key map (RecordKeyMap = RepositoryId -> Actor_Id
     * -> RepositoryEntity_ActorRecordId) for the recordUpdateMap (the specified combination
     * of columns/values being updated)
     * @param {Map<ColumnIndex, RecordUpdate>} recordUpdateMap
     * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
     * @returns {RecordKeyMap}
     */
    private getRecordKeyMap;
    /**
     * Run all updates for a particular table.  One update per updated column combination
     * is run.
     *
     * @param {ApplicationIndex} applicationIndex
     * @param {TableIndex} tableIndex
     * @param {ColumnUpdateKeyMap} updateKeyMap
     * @returns {Promise<void>}
     */
    private runUpdatesForTable;
}
//# sourceMappingURL=Stage2SyncedInDataProcessor.d.ts.map