import { IUtils } from "@airport/air-control";
import { ColumnIndex, SchemaIndex, SchemaName, SchemaVersionId, TableIndex } from "@airport/ground-control";
import { ActorId, IOperationHistory, IRecordHistory, IRecordHistoryNewValue, IRepositoryTransactionHistory, RecordHistoryId, RepositoryEntityActorRecordId, RepositoryId } from "@airport/holding-pattern";
import { IMissingRecordRepoTransBlock, ISharingMessage, ISynchronizationConflict, RepositoryTransactionBlockData } from "@airport/moving-walkway";
import { ISchema, SchemaDomainName } from "@airport/traffic-pattern";
import { MaxSchemaVersionView } from "@airport/traffic-pattern/lib/dao/SchemaVersionDao";
export declare type RemoteSchemaIndex = SchemaIndex;
export declare type RemoteSchemaVersionId = SchemaVersionId;
export declare type RemoteActorId = ActorId;
/**
 * Data of the message from AGT to Terminal (TM)
 */
export interface IDataToTM {
    data: RepositoryTransactionBlockData;
    serializedData: string;
    sharingMessage: ISharingMessage;
}
export interface SchemaCheckResults {
    dataMessagesToBeUpgraded: IDataToTM[];
    dataMessagesWithCompatibleSchemas: IDataToTM[];
    dataMessagesWithIncompatibleSchemas: IDataToTM[];
    dataMessagesWithInvalidSchemas: IDataToTM[];
    maxVersionedMapBySchemaAndDomainNames: Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>;
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
    dataMessagesWithInvalidSchemas: IDataToTM[];
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
    ensureRecordMapForRepoInTable<CI extends number | string, V>(repositoryId: RepositoryId, operationHistory: IOperationHistory, recordMapBySchemaTableAndRepository: Map<SchemaVersionId, Map<TableIndex, Map<RepositoryId, Map<CI, V>>>>): Map<CI, V>;
}
export interface Stage1SyncedInDataProcessingResult {
    recordCreations: Map<SchemaVersionId, Map<TableIndex, Map<RepositoryId, Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>;
    recordDeletions: Map<SchemaVersionId, Map<TableIndex, Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
    recordUpdates: Map<SchemaVersionId, Map<TableIndex, Map<RepositoryId, Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>;
    syncConflictMapByRepoId: Map<RepositoryId, ISynchronizationConflict[]>;
}
export declare class SyncInUtils implements ISyncInUtils {
    private utils;
    constructor(utils: IUtils);
    ensureRecordMapForRepoInTable<CI extends number | string, V>(repositoryId: RepositoryId, operationHistory: IOperationHistory, recordMapBySchemaTableAndRepository: Map<SchemaVersionId, Map<TableIndex, Map<RepositoryId, Map<CI, V>>>>): Map<CI, V>;
    private recordRepoTransBlocks;
    private recordSharingMessageRepoTransBlocks;
    private recordSharingNodeRepoTransBlocks;
}
