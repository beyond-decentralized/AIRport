import { IAirportDatabase, IUtils } from "@airport/air-control";
import { ColumnIndex, SchemaVersionId, TableIndex } from "@airport/ground-control";
import { ActorId, RepositoryEntityActorRecordId, RepositoryId } from "@airport/holding-pattern";
import { IRecordUpdateStageDao } from "@airport/moving-walkway";
import { ISchema } from "@airport/traffic-pattern";
import { RecordUpdate, Stage1SyncedInDataProcessingResult } from "./SyncInUtils";
/**
 * Stage 2 data processor is used to optimize to optimize the number of required
 * I/O operations to do applyChangesToDb the terminal I/O (Creates, Updates, Deletes)
 */
export interface IStage2SyncedInDataProcessor {
    applyChangesToDb(stage1Result: Stage1SyncedInDataProcessingResult, schemasBySchemaVersionIdMap: Map<SchemaVersionId, ISchema>): Promise<void>;
}
export declare class Stage2SyncedInDataProcessor implements IStage2SyncedInDataProcessor {
    private airportDb;
    private recordUpdateStageDao;
    private utils;
    constructor(airportDb: IAirportDatabase, recordUpdateStageDao: IRecordUpdateStageDao, utils: IUtils);
    applyChangesToDb(stage1Result: Stage1SyncedInDataProcessingResult, schemasBySchemaVersionIdMap: Map<SchemaVersionId, ISchema>): Promise<void>;
    /**
     * Remote changes come in with SchemaVersionIds not SchemaIndexes, so it makes
     * sense to keep this structure.  NOTE: only one version of a given schema is
     * processed at one time:
     *
     *  Changes for a schema version below the one in this Terminal must first be upgraded.
     *  Terminal itself must first be upgraded to newer schema versions, before changes
     *  for that schema version are processed.
     *
     *  To tie in a given SchemaVersionId to its SchemaIndex an additional mapping data
     *  structure is passed in.
     */
    performCreates(recordCreations: Map<SchemaVersionId, Map<TableIndex, Map<RepositoryId, Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>, schemasBySchemaVersionIdMap: Map<SchemaVersionId, ISchema>): Promise<void>;
    performUpdates(recordUpdates: Map<SchemaVersionId, Map<TableIndex, Map<RepositoryId, Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>, schemasBySchemaVersionIdMap: Map<SchemaVersionId, ISchema>): Promise<void>;
    performDeletes(recordDeletions: Map<SchemaVersionId, Map<TableIndex, Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>, schemasBySchemaVersionIdMap: Map<SchemaVersionId, ISchema>): Promise<void>;
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
    private runUpdatesForTable(schemaIndex, schemaVersionId, tableIndex, updateKeyMap);
}
