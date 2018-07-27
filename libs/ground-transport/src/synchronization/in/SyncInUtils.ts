import {
	IUtils,
	UtilsToken
}                                      from "@airport/air-control";
import {RepoTransBlockSyncOutcomeType} from "@airport/arrivals-n-departures";
import {
	ColumnIndex,
	SchemaIndex,
	SchemaName,
	SchemaVersionId,
	TableIndex
}                                      from "@airport/ground-control";
import {
	ActorId,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRepositoryTransactionHistory,
	RecordHistoryId,
	RepositoryEntityActorRecordId,
	RepositoryId
}                                      from "@airport/holding-pattern";
import {
	IMissingRecordRepoTransBlock,
	IRepositoryTransactionBlock,
	IRepositoryTransactionBlockDao,
	ISharingMessage,
	ISynchronizationConflict,
	RepositoryTransactionBlockDaoToken,
	RepositoryTransactionBlockData,
	SharingNodeRepoTransBlock,
}                                      from "@airport/moving-walkway";
import {
	ISchema,
	SchemaDomainName
}                                      from "@airport/traffic-pattern";
import {MaxSchemaVersionView}          from "@airport/traffic-pattern/lib/dao/SchemaVersionDao";
import {
	Inject,
	Service
}                                      from "typedi";
import {stringify}                     from "zipson/lib";
import {SyncInUtilsToken}              from "../../InjectionTokens";

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
	// syncDatetime: AgtSyncRecordAddDatetime;
}

export interface DataMessageSchemaGroupings {
	dataMessagesToBeUpgraded: IDataToTM[];
	dataMessagesWithCompatibleSchemas: IDataToTM[];
	dataMessagesWithIncompatibleSchemas: IDataToTM[];
	// dataMessagesWithInvalidSchemas: IDataToTM[];
	missingSchemaNameMap: Map<SchemaDomainName, Set<SchemaName>>;
	schemasToBeUpgradedMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>;
}

/**
 * Result of comparing to versions of a given schema.
 */
export enum SchemaComparisonResult {
	// Version specified in the message is lower than it's version in the receiving Terminal (TM)
	MESSAGE_SCHEMA_VERSION_IS_LOWER = -1,
	// Version of the schema used i the message is the same as that in the receiving Terminal (TM)
	MESSAGE_SCHEMA_VERSION_IS_EQUAL = 0,
	// Version specified in the message in higher than it's version in the receiving Terminal (TM)
	MESSAGE_SCHEMA_VERSION_IS_HIGHER = 1,
}

export interface ISyncRepoTransHistory
	extends IRepositoryTransactionHistory {
	isLocal?: boolean;
	operationHistory: ISyncOperationHistory[];
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
			Map<TableIndex, Map<RepositoryId, Map<CI, V>>>>
	): Map<CI, V>;

	// createSharingMessage(
	// 	dataMessageToClient: IDataToTM,
	// 	processingStatus: RepoTransBlockSyncOutcomeType,
	// 	saveData: boolean
	// ): ISharingMessage;

}

export interface Stage1SyncedInDataProcessingResult {
	recordCreations: Map<SchemaVersionId,
		Map<TableIndex, Map<RepositoryId, Map<ActorId,
			Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>,
	recordDeletions: Map<SchemaVersionId,
		Map<TableIndex, Map<RepositoryId, Map<ActorId,
			Set<RepositoryEntityActorRecordId>>>>>,
	recordUpdates: Map<SchemaVersionId,
		Map<TableIndex, Map<RepositoryId, Map<ActorId,
			Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>,
	syncConflictMapByRepoId: Map<RepositoryId, ISynchronizationConflict[]>
}

@Service(SyncInUtilsToken)
export class SyncInUtils
	implements ISyncInUtils {

	constructor(
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	ensureRecordMapForRepoInTable<CI extends number | string, V>(
		repositoryId: RepositoryId,
		operationHistory: IOperationHistory,
		recordMapBySchemaTableAndRepository: Map<SchemaVersionId,
			Map<TableIndex, Map<RepositoryId, Map<CI, V>>>>
	): Map<CI, V> {
		// FIXME: ensure that OperationHistory schemaVersion is correctly set
		return <any>this.utils.ensureChildJsMap(
			this.utils.ensureChildJsMap(
				this.utils.ensureChildJsMap(
					recordMapBySchemaTableAndRepository, operationHistory.schemaVersion.id),
				operationHistory.entity.index), repositoryId);
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

		let snrtb: SharingNodeRepoTransBlock;
	}

}