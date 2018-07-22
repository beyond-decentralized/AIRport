import { IAirportDatabase, IUtils } from "@airport/air-control";
import { ColumnIndex, SchemaIndex, TableIndex } from "@airport/ground-control";
import { ActorId, RepositoryEntityActorRecordId, RepositoryId } from "@airport/holding-pattern";
import { IRecordUpdateStageDao } from "@airport/moving-walkway";
import { RecordUpdate, Stage1SyncedInDataProcessingResult } from "./SyncInUtils";
/**
 * Stage 2 data processor is used to optimize to optimize the number of required
 * I/O operations to do applyChangesToDb the terminal I/O (Creates, Updates, Deletes)
 */
export interface IStage2SyncedInDataProcessor {
    applyChangesToDb(stage1Result: Stage1SyncedInDataProcessingResult): Promise<void>;
}
export declare class Stage2SyncedInDataProcessor implements IStage2SyncedInDataProcessor {
    private airportDb;
    private recordUpdateStageDao;
    private utils;
    constructor(airportDb: IAirportDatabase, recordUpdateStageDao: IRecordUpdateStageDao, utils: IUtils);
    applyChangesToDb(stage1Result: Stage1SyncedInDataProcessingResult): Promise<void>;
    performCreates(recordCreations: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>): Promise<void>;
    performUpdates(recordUpdates: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>): Promise<void>;
    /**
     * Get the record key map (RecordKeyMap = RepositoryId -> ActorId
     * -> RepositoryEntityActorRecordId) for the recordUpdateMap (the specified combination of
     * columns/values being updated)
     * @param {Map<ColumnIndex, RecordUpdate>} recordUpdateMap
     * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
     * @returns {RecordKeyMap}
     */
    private getRecordKeyMap(recordUpdateMap, finalTableUpdateMap);
    /**
     * Run all updates for a particular table.  One update per updated column combination is run.
     *
     * @param {SchemaIndex} schemaIndex
     * @param {TableIndex} tableIndex
     * @param {ColumnUpdateKeyMap} updateKeyMap
     * @returns {Promise<void>}
     */
    private runUpdatesForTable(schemaIndex, tableIndex, updateKeyMap);
    performDeletes(recordDeletions: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>): Promise<void>;
}
