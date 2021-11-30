import { system } from '@airport/di'
import { ISynchronizationConflictDao } from "./dao/conflict/SynchronizationConflictDao";
import { ISynchronizationConflictPendingNotificationDao } from "./dao/conflict/SynchronizationConflictPendingNotificationDao";
import { ISynchronizationConflictValuesDao } from "./dao/conflict/SynchronizationConflictValuesDao";
import { IRecordUpdateStageDao } from "./dao/RecordUpdateStageDao";

const movingWalkway = system('airport').lib('moving-walkway')

export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token<IRecordUpdateStageDao>('IRecordUpdateStageDao');
export const SYNC_CONFLICT_DAO
	= movingWalkway.token<ISynchronizationConflictDao>('ISynchronizationConflictDao');
export const SYNC_CONFLICT_PENDING_NOTIFICATION_DAO
	= movingWalkway.token<ISynchronizationConflictPendingNotificationDao>('ISynchronizationConflictPendingNotificationDao');
export const SYNC_CONFLICT_VALUES_DAO
	= movingWalkway.token<ISynchronizationConflictValuesDao>('ISynchronizationConflictValuesDao');
