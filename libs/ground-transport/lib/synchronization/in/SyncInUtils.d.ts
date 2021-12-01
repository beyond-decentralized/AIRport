import { ColumnIndex, EntityId, ApplicationIndex, ApplicationVersionId } from '@airport/ground-control';
import { Actor_Id, IOperationHistory, IRecordHistory, IRecordHistoryNewValue, IRepositoryTransactionHistory, RecordHistoryId, RepositoryEntity_ActorRecordId, Repository_Id } from '@airport/holding-pattern';
import { ISynchronizationConflict } from '@airport/moving-walkway';
export declare type RemoteApplicationIndex = ApplicationIndex;
export declare type RemoteApplicationVersionId = ApplicationVersionId;
export declare type RemoteActorId = Actor_Id;
/**
 * Result of comparing to versions of a given application.
 */
export declare enum ApplicationComparisonResult {
    MESSAGE_APPLICATION_VERSION_IS_LOWER = -1,
    MESSAGE_APPLICATION_VERSION_IS_EQUAL = 0,
    MESSAGE_APPLICATION_VERSION_IS_HIGHER = 1
}
export interface ISyncRepoTransHistory extends IRepositoryTransactionHistory {
    isLocal?: boolean;
    operationHistory?: ISyncOperationHistory[];
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
    ensureRecordMapForRepoInTable<CI extends number | string, V>(repositoryId: Repository_Id, operationHistory: IOperationHistory, recordMapByApplicationTableAndRepository: Map<ApplicationVersionId, Map<EntityId, Map<Repository_Id, Map<CI, V>>>>): Map<CI, V>;
}
export interface Stage1SyncedInDataProcessingResult {
    recordCreations: Map<ApplicationVersionId, Map<EntityId, Map<Repository_Id, Map<Actor_Id, Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, any>>>>>>;
    recordDeletions: Map<ApplicationVersionId, Map<EntityId, Map<Repository_Id, Map<Actor_Id, Set<RepositoryEntity_ActorRecordId>>>>>;
    recordUpdates: Map<ApplicationVersionId, Map<EntityId, Map<Repository_Id, Map<Actor_Id, Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>;
    syncConflictMapByRepoId: Map<Repository_Id, ISynchronizationConflict[]>;
}
export declare class SyncInUtils implements ISyncInUtils {
    ensureRecordMapForRepoInTable<CI extends number | string, V>(repositoryId: Repository_Id, operationHistory: IOperationHistory, recordMapByApplicationTableAndRepository: Map<ApplicationVersionId, Map<EntityId, Map<Repository_Id, Map<CI, V>>>>): Map<CI, V>;
}
//# sourceMappingURL=SyncInUtils.d.ts.map