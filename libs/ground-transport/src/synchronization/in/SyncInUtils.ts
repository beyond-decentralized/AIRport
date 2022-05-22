import {
	Injected
} from '@airport/direction-indicator'
import {
	ColumnIndex,
	ensureChildJsMap,
	EntityId,
	ApplicationIndex,
	ApplicationVersionId
} from '@airport/ground-control'
import {
	Actor_Id,
	IOperationHistory,
	IRecordHistory,
	IRecordHistoryNewValue,
	IRepositoryTransactionHistory,
	RecordHistoryId,
	RepositoryEntity_ActorRecordId,
	Repository_Id
} from '@airport/holding-pattern'
import {
	ISynchronizationConflict
} from '@airport/moving-walkway'

export type RemoteApplicationIndex = ApplicationIndex;
export type RemoteApplicationVersionId = ApplicationVersionId;
export type RemoteActorId = Actor_Id;

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

}

export interface Stage1SyncedInDataProcessingResult {
	recordCreations: Map<ApplicationVersionId,
		Map<EntityId, Map<Repository_Id, Map<Actor_Id,
			Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, any>>>>>>,
	recordDeletions: Map<ApplicationVersionId,
		Map<EntityId, Map<Repository_Id, Map<Actor_Id,
			Set<RepositoryEntity_ActorRecordId>>>>>,
	recordUpdates: Map<ApplicationVersionId,
		Map<EntityId, Map<Repository_Id, Map<Actor_Id,
			Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>,
	syncConflictMapByRepoId: Map<Repository_Id, ISynchronizationConflict[]>
}

@Injected()
export class SyncInUtils
	implements ISyncInUtils {

	ensureRecordMapForRepoInTable<CI extends number | string, V>(
		repositoryId: Repository_Id,
		operationHistory: IOperationHistory,
		recordMapByApplicationTableAndRepository: Map<ApplicationVersionId,
			Map<EntityId, Map<Repository_Id, Map<CI, V>>>>
	): Map<CI, V> {
		return <any>ensureChildJsMap(
			ensureChildJsMap(
				ensureChildJsMap(
					recordMapByApplicationTableAndRepository, operationHistory.entity.applicationVersion.id),
				operationHistory.entity.index), repositoryId)
	}

}
