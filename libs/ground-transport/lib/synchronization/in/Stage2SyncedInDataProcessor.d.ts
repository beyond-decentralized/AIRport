import { IAirportDatabase, IDatabaseFacade, IUtils } from '@airport/air-traffic-control';
import { ApplicationColumn_Index, ApplicationVersion_LocalId, ApplicationEntity_TableIndex, DbColumn, DbEntity } from '@airport/ground-control';
import { Actor_LocalId, AirEntity_ActorRecordId, Repository_LocalId } from '@airport/holding-pattern';
import { IRecordUpdateStageDao } from '@airport/layover';
import { IApplication } from '@airport/airspace';
import { RecordUpdate, Stage1SyncedInDataProcessingResult } from './SyncInUtils';
import { IOperationContext } from '@airport/terminal-map';
/**
 * Stage 2 data processor is used to optimize the number of required
 * I/O operations to do applyChangesToDb the terminal I/O (Creates, Updates, Deletes)
 */
export interface IStage2SyncedInDataProcessor {
    applyChangesToDb(stage1Result: Stage1SyncedInDataProcessingResult, applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>): Promise<void>;
}
export declare class Stage2SyncedInDataProcessor implements IStage2SyncedInDataProcessor {
    airportDatabase: IAirportDatabase;
    databaseFacade: IDatabaseFacade;
    recordUpdateStageDao: IRecordUpdateStageDao;
    utils: IUtils;
    applyChangesToDb(stage1Result: Stage1SyncedInDataProcessingResult, applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>): Promise<void>;
    /**
     * Remote changes come in with ApplicationVersion_LocalIds not Application_Indexes, so it makes
     * sense to keep this structure.  NOTE: only one version of a given application is
     * processed at one time:
     *
     *  Changes for a application version below the one in this Terminal must first be upgraded.
     *  Terminal itself must first be upgraded to newer application versions, before changes
     *  for that application version are processed.
     *
     *  To tie in a given ApplicationVersion_LocalId to its Application_Index an additional mapping data
     *  structure is passed in.
     */
    performCreates(recordCreations: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId, Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>>>>, applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>, context: IOperationContext): Promise<void>;
    getNonIdColumnsInIndexOrder(dbEntity: DbEntity): DbColumn[];
    performUpdates(recordUpdates: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId, Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, RecordUpdate>>>>>>, applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>, context: IOperationContext): Promise<void>;
    performDeletes(recordDeletions: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId, Set<AirEntity_ActorRecordId>>>>>, applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>, context: IOperationContext): Promise<void>;
    /**
     * Get the record key map (RecordKeyMap = RepositoryId -> Actor_LocalId
     * -> AirEntity_ActorRecordId) for the recordUpdateMap (the specified combination
     * of columns/values being updated)
     * @param {Map<ApplicationColumn_Index, RecordUpdate>} recordUpdateMap
     * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
     * @returns {RecordKeyMap}
     */
    private getRecordKeyMap;
    /**
     * Run all updates for a particular table.  One update per updated column combination
     * is run.
     *
     * @param {Application_Index} applicationIndex
     * @param {ApplicationEntity_TableIndex} tableIndex
     * @param {ColumnUpdateKeyMap} updateKeyMap
     * @returns {Promise<void>}
     */
    private runUpdatesForTable;
}
//# sourceMappingURL=Stage2SyncedInDataProcessor.d.ts.map