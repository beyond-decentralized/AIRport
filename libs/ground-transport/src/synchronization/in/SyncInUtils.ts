import {DI}            from '@airport/di'
import {
	ColumnIndex,
	ensureChildJsMap,
	EntityId,
	SchemaIndex,
	SchemaVersionId
}                      from '@airport/ground-control'
import {
	ActorId,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRepositoryTransactionHistory,
	RecordHistoryId,
	RepositoryEntity_ActorRecordId,
	RepositoryId
}                      from '@airport/holding-pattern'
import {
	IRepositoryTransactionBlock,
	ISharingMessage,
	ISynchronizationConflict,
	RepositoryTransactionBlockData,
	SharingNodeRepoTransBlock,
}                      from '@airport/moving-walkway'
import {SYNC_IN_UTILS} from '../../tokens'

export type RemoteSchemaIndex = SchemaIndex;
export type RemoteSchemaVersionId = SchemaVersionId;
export type RemoteActorId = ActorId;

/**
 * Data of the message from AGT to Terminal (TM)
 */
export interface IDataToTM {
	// actorIdMap: Map<RemoteActorId, ActorId>;
	// sourceAgtTerminalId: AgtTerminalId;
	// agtRepositoryId: AgtRepositoryId;
	// agtSyncRecordId: AgtSyncRecordId;
	data: RepositoryTransactionBlockData;
	repositoryTransactionBlock?: IRepositoryTransactionBlock;
	serializedData: string;
	sharingMessage: ISharingMessage;
	missingSchemaMap;
	schemasToBeUpgradedMap;
	// syncDatetime: AgtSyncRecordAddDatetime;
}

/**
 * Result of comparing to versions of a given schema.
 */
export enum SchemaComparisonResult {
	// Version specified in the message is lower than it's version in the receiving
	// Terminal (TM)
	MESSAGE_SCHEMA_VERSION_IS_LOWER  = -1,
	// Version of the schema used i the message is the same as that in the receiving
	// Terminal (TM)
	MESSAGE_SCHEMA_VERSION_IS_EQUAL  = 0,
	// Version specified in the message in higher than it's version in the receiving
	// Terminal (TM)
	MESSAGE_SCHEMA_VERSION_IS_HIGHER = 1,
}

export interface ISyncRepoTransHistory
	extends IRepositoryTransactionHistory {
	isLocal?: boolean;
	operationHistory?: ISyncOperationHistory[];
}

export interface ISyncOperationHistory
	extends IOperationHistory {
	recordHistory?: ISyncRecordHistory[];
}

export interface ISyncRecordHistory
	extends IRecordHistory {
	newValueMap?: Map<ColumnIndex, ISyncNewValue>;
}

export interface ISyncNewValue
	extends IRecordHistoryNewValue {
	// isLocal?: boolean;
	// recordHistoryId?: RecordHistoryId;
}

export interface RecordUpdate {
	newValue: any;
	recordHistoryId: RecordHistoryId;
}

export interface ISyncInUtils {

	ensureRecordMapForRepoInTable<CI extends number | string, V>(
		repositoryId: RepositoryId,
		operationHistory: IOperationHistory,
		recordMapBySchemaTableAndRepository: Map<SchemaVersionId,
			Map<EntityId, Map<RepositoryId, Map<CI, V>>>>
	): Map<CI, V>;

	// createSharingMessage(
	// 	dataMessageToClient: IDataToTM,
	// 	processingStatus: RepoTransBlockSyncOutcomeType,
	// 	saveData: boolean
	// ): ISharingMessage;

}

export interface Stage1SyncedInDataProcessingResult {
	recordCreations: Map<SchemaVersionId,
		Map<EntityId, Map<RepositoryId, Map<ActorId,
			Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, any>>>>>>,
	recordDeletions: Map<SchemaVersionId,
		Map<EntityId, Map<RepositoryId, Map<ActorId,
			Set<RepositoryEntity_ActorRecordId>>>>>,
	recordUpdates: Map<SchemaVersionId,
		Map<EntityId, Map<RepositoryId, Map<ActorId,
			Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>,
	syncConflictMapByRepoId: Map<RepositoryId, ISynchronizationConflict[]>
}

export class SyncInUtils
	implements ISyncInUtils {

	ensureRecordMapForRepoInTable<CI extends number | string, V>(
		repositoryId: RepositoryId,
		operationHistory: IOperationHistory,
		recordMapBySchemaTableAndRepository: Map<SchemaVersionId,
			Map<EntityId, Map<RepositoryId, Map<CI, V>>>>
	): Map<CI, V> {
		// FIXME: ensure that OperationHistory schemaVersion is correctly set
		return <any>ensureChildJsMap(
			ensureChildJsMap(
				ensureChildJsMap(
					recordMapBySchemaTableAndRepository, operationHistory.entity.schemaVersion.id),
				operationHistory.entity.id), repositoryId)
	}

	// createSharingMessage(
	// 	dataMessageToClient: IDataToTM,
	// 	processingStatus: RepoTransBlockSyncOutcomeType,
	// 	saveData: boolean
	// ): ISharingMessage {
	// 	return {
	// 		sharingNode: dataMessageToClient.sharingNode,
	// 		// agtTerminalSyncLogId: null,
	// 		// origin: DataOrigin.REMOTE,
	// 		// syncStatus: BlockSyncStatus.SYNCHRONIZED,
	// 		source: null, // FIXME add source terminal
	// 		processingStatus,
	// 		syncTimestamp: new Date(dataMessageToClient.syncDatetime),
	// 		// dataCache: saveData ? stringify(dataMessageToClient.data) : undefined
	// 	};
	// }

	private async recordSharingMessageRepoTransBlocks() {

	}

	private async recordSharingNodeRepoTransBlocks() {

		let snrtb: SharingNodeRepoTransBlock
	}

}

DI.set(SYNC_IN_UTILS, SyncInUtils)
