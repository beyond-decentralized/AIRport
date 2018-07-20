import { IUtils } from "@airport/air-control";
import { RepoTransBlockSyncOutcomeType } from "@airport/arrivals-n-departures";
import { ColumnIndex, SchemaIndex, SchemaName, TableIndex } from "@airport/ground-control";
import { ActorId, IOperationHistory, IRecordHistory, IRecordHistoryNewValue, IRepositoryTransactionHistory, RecordHistoryId, RepositoryEntityActorRecordId, RepositoryId } from "@airport/holding-pattern";
import { IMissingRecordRepoTransBlock, ISharingMessage, ISharingNode, ISynchronizationConflict, RepositoryTransactionBlockData } from "@airport/moving-walkway";
import { ISchema, SchemaDomainName } from "@airport/traffic-pattern";
export declare type RemoteSchemaIndex = SchemaIndex;
export declare type RemoteActorId = ActorId;
/**
 * Data of the message from AGT to Terminal (TM)
 */
export interface IDataToTM {
    data: RepositoryTransactionBlockData;
    serializedData: string;
    sharingNode: ISharingNode;
}
export interface SchemaCheckResults {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    allSchemaMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
    schemasWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
}
export interface DataCheckResults {
    dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
    existingRepoTransBlocksWithCompatibleSchemasAndData: ISharingMessage[];
    missingRecordRepoTransBlocks: IMissingRecordRepoTransBlock[];
    sharingMessagesWithIncompatibleData: ISharingMessage[];
}
export interface DataMessageSchemaGroupings {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    missingSchemaNameMap: Map<SchemaDomainName, Set<SchemaName>>;
    schemasToBeUpgradedMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
}
/**
 * Result of comparing to versions of a given schema.
 */
export declare enum SchemaComparisonResult {
    MESSAGE_SCHEMA_VERSION_IS_LOWER = -1,
    MESSAGE_SCHEMA_VERSION_IS_EQUAL = 0,
    MESSAGE_SCHEMA_VERSION_IS_HIGHER = 1
}
export interface ISyncRepoTransHistory extends IRepositoryTransactionHistory {
    isLocal?: boolean;
    operationHistory: ISyncOperationHistory[];
}
export interface ISyncOperationHistory extends IOperationHistory {
    recordHistory?: ISyncRecordHistory[];
}
export interface ISyncRecordHistory extends IRecordHistory {
    newValueMap?: Map<ColumnIndex, ISyncNewValue>;
}
export interface ISyncNewValue extends IRecordHistoryNewValue {
}
export interface RecordUpdate {
    newValue: any;
    recordHistoryId: RecordHistoryId;
}
export interface ISyncInUtils {
    ensureRecordMapForRepoInTable<CI extends number | string, V>(repositoryId: RepositoryId, operationHistory: IOperationHistory, recordMapBySchemaTableAndRepository: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<CI, V>>>>): Map<CI, V>;
    createSharingMessage(dataMessageToClient: IDataToTM, processingStatus: RepoTransBlockSyncOutcomeType, saveData: boolean): ISharingMessage;
}
export interface Stage1SyncedInDataProcessingResult {
    recordCreations: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>;
    recordDeletions: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
    recordUpdates: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>;
    syncConflictMapByRepoId: Map<RepositoryId, ISynchronizationConflict[]>;
}
export declare class SyncInUtils implements ISyncInUtils {
    private utils;
    constructor(utils: IUtils);
    ensureRecordMapForRepoInTable<CI extends number | string, V>(repositoryId: RepositoryId, operationHistory: IOperationHistory, recordMapBySchemaTableAndRepository: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<CI, V>>>>): Map<CI, V>;
    createSharingMessage(dataMessageToClient: IDataToTM, processingStatus: RepoTransBlockSyncOutcomeType, saveData: boolean): ISharingMessage;
}
