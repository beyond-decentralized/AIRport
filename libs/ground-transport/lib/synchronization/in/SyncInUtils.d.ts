import { ApplicationColumn_Index, ApplicationEntity_LocalId, Application_Index, ApplicationVersion_LocalId } from '@airport/ground-control';
import { Actor_LocalId, IOperationHistory, IRecordHistory, IRecordHistoryNewValue, IRepositoryTransactionHistory, RecordHistory_LocalId, AirEntity_ActorRecordId, Repository_LocalId } from '@airport/holding-pattern';
import { ISynchronizationConflict } from '@airport/moving-walkway';
export declare type RemoteApplication_Index = Application_Index;
export declare type RemoteApplicationVersion_LocalId = ApplicationVersion_LocalId;
export declare type RemoteActorId = Actor_LocalId;
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
    newValueMap?: Map<ApplicationColumn_Index, ISyncNewValue>;
}
export interface ISyncNewValue extends IRecordHistoryNewValue {
}
export interface RecordUpdate {
    newValue: any;
    recordHistoryLocalId: RecordHistory_LocalId;
}
export interface ISyncInUtils {
    ensureRecordMapForRepoInTable<CI extends number | string, V>(repositoryLocalId: Repository_LocalId, operationHistory: IOperationHistory, recordMapByApplicationTableAndRepository: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<CI, V>>>>): Map<CI, V>;
}
export interface Stage1SyncedInDataProcessingResult {
    recordCreations: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId, Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, any>>>>>>;
    recordDeletions: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId, Set<AirEntity_ActorRecordId>>>>>;
    recordUpdates: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId, Map<AirEntity_ActorRecordId, Map<ApplicationColumn_Index, RecordUpdate>>>>>>;
    syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]>;
}
export declare class SyncInUtils implements ISyncInUtils {
    ensureRecordMapForRepoInTable<CI extends number | string, V>(repositoryLocalId: Repository_LocalId, operationHistory: IOperationHistory, recordMapByApplicationTableAndRepository: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_LocalId, Map<Repository_LocalId, Map<CI, V>>>>): Map<CI, V>;
}
//# sourceMappingURL=SyncInUtils.d.ts.map