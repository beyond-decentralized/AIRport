import { system } from '@airport/di';
const movingWalkway = system('airport').lib('moving-walkway');
export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token('IRecordUpdateStageDao');
export const SYNC_CONFLICT_DAO = movingWalkway.token('ISynchronizationConflictDao');
export const SYNC_CONFLICT_PENDING_NOTIFICATION_DAO = movingWalkway.token('ISynchronizationConflictPendingNotificationDao');
export const SYNC_CONFLICT_VALUES_DAO = movingWalkway.token('ISynchronizationConflictValuesDao');
//# sourceMappingURL=tokens.js.map