import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ApplicationColumn_Index,
	ApplicationEntity_LocalId,
	Application_Index,
	ApplicationVersion_LocalId,
	IDatastructureUtils,
	Actor_LocalId,
	Repository_LocalId,
	ActorRecordId,
	RecordHistory_LocalId,
	IRepositoryTransactionHistory,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	ISynchronizationConflict
} from '@airport/ground-control'

export type RemoteApplication_Index = Application_Index;
export type RemoteApplicationVersion_LocalId = ApplicationVersion_LocalId;
export type RemoteActorId = Actor_LocalId;

/**
 * Result of comparing to versions of a given application.
 */
export enum ApplicationComparisonResult {
	// Version specified in the message is lower than it's version in the receiving
	// Terminal (TM)
	MESSAGE_APPLICATION_VERSION_IS_LOWER = -1,
	// Version of the application used i the message is the same as that in the receiving
	// Terminal (TM)
	MESSAGE_APPLICATION_VERSION_IS_EQUAL = 0,
	// Version specified in the message in higher than it's version in the receiving
	// Terminal (TM)
	MESSAGE_APPLICATION_VERSION_IS_HIGHER = 1,
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
	newValueMap?: Map<ApplicationColumn_Index, ISyncNewValue>;
}

export interface ISyncNewValue
	extends IRecordHistoryNewValue {
	// isLocal?: boolean;
	// RecordHistory_LocalId?: RecordHistory_LocalId;
}

export interface RecordUpdate {
	newValue: any;
	recordHistoryLocalId: RecordHistory_LocalId;
}

export interface ISyncInUtils {

	ensureRecordMapForRepoInTable<CI extends number | string, V>(
		repositoryLocalId: Repository_LocalId,
		operationHistory: IOperationHistory,
		recordMapByApplicationTableAndRepository: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<CI, V>>>>
	): Map<CI, V>;

}

export interface Stage1SyncedInDataProcessingResult {
	recordCreations: Map<ApplicationVersion_LocalId,
		Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
			Map<ActorRecordId, Map<ApplicationColumn_Index, any>>>>>>,
	recordDeletions: Map<ApplicationVersion_LocalId,
		Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
			Set<ActorRecordId>>>>>,
	recordUpdates: Map<ApplicationVersion_LocalId,
		Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
			Map<ActorRecordId, Map<ApplicationColumn_Index, RecordUpdate>>>>>>,
	syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]>
}

@Injected()
export class SyncInUtils
	implements ISyncInUtils {

	@Inject()
	datastructureUtils: IDatastructureUtils

	ensureRecordMapForRepoInTable<CI extends number | string, V>(
		repositoryLocalId: Repository_LocalId,
		operationHistory: IOperationHistory,
		recordMapByApplicationTableAndRepository: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<CI, V>>>>
	): Map<CI, V> {
		return <any>this.datastructureUtils.ensureChildJsMap(
			this.datastructureUtils.ensureChildJsMap(
				this.datastructureUtils.ensureChildJsMap(
					recordMapByApplicationTableAndRepository, operationHistory.entity.applicationVersion._localId),
				operationHistory.entity.index), repositoryLocalId)
	}

}
