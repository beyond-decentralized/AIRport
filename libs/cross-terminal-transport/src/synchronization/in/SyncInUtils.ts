import {DI}            from '@airport/di'
import {
	ColumnIndex,
	ensureChildJsMap,
	EntityId,
	ApplicationIndex,
	ApplicationVersionId
}                      from '@airport/ground-control'
import {
	ActorId,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRepositoryTransactionHistory,
	RecordHistoryId,
	RepositoryEntity_ActorRecordId,
	Repository_Id
}                      from '@airport/holding-pattern'
import {
	IRepositoryTransactionBlock,
	ISharingMessage,
	ISynchronizationConflict,
	RepositoryTransactionBlockData,
	SharingNodeRepoTransBlock,
}                      from '@airport/moving-walkway'
import {SYNC_IN_UTILS} from '../../tokens'

export type RemoteApplicationIndex = ApplicationIndex;
export type RemoteApplicationVersionId = ApplicationVersionId;
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
	missingApplicationMap;
	applicationsToBeUpgradedMap;
	// syncDatetime: AgtSyncRecordAddDatetime;
}

/**
 * Result of comparing to versions of a given application.
 */
export enum ApplicationComparisonResult {
	// Version specified in the message is lower than it's version in the receiving
	// Terminal (TM)
	MESSAGE_SCHEMA_VERSION_IS_LOWER  = -1,
	// Version of the application used i the message is the same as that in the receiving
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
		repositoryId: Repository_Id,
		operationHistory: IOperationHistory,
		recordMapByApplicationTableAndRepository: Map<ApplicationVersionId,
			Map<EntityId, Map<Repository_Id, Map<CI, V>>>>
	): Map<CI, V>;

	// createSharingMessage(
	// 	dataMessageToClient: IDataToTM,
	// 	processingStatus: RepoTransBlockSyncOutcomeType,
	// 	saveData: boolean
	// ): ISharingMessage;

}

export interface Stage1SyncedInDataProcessingResult {
	recordCreations: Map<ApplicationVersionId,
		Map<EntityId, Map<Repository_Id, Map<ActorId,
			Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, any>>>>>>,
	recordDeletions: Map<ApplicationVersionId,
		Map<EntityId, Map<Repository_Id, Map<ActorId,
			Set<RepositoryEntity_ActorRecordId>>>>>,
	recordUpdates: Map<ApplicationVersionId,
		Map<EntityId, Map<Repository_Id, Map<ActorId,
			Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>,
	syncConflictMapByRepoId: Map<Repository_Id, ISynchronizationConflict[]>
}

export class SyncInUtils
	implements ISyncInUtils {

	ensureRecordMapForRepoInTable<CI extends number | string, V>(
		repositoryId: Repository_Id,
		operationHistory: IOperationHistory,
		recordMapByApplicationTableAndRepository: Map<ApplicationVersionId,
			Map<EntityId, Map<Repository_Id, Map<CI, V>>>>
	): Map<CI, V> {
		// FIXME: ensure that OperationHistory applicationVersion is correctly set
		return <any>ensureChildJsMap(
			ensureChildJsMap(
				ensureChildJsMap(
					recordMapByApplicationTableAndRepository, operationHistory.entity.applicationVersion.id),
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
