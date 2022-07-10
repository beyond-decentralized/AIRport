import { lib } from '@airport/direction-indicator';
import { SynchronizationConflictDao } from "./dao/conflict/SynchronizationConflictDao";
import { SynchronizationConflictValuesDao } from "./dao/conflict/SynchronizationConflictValuesDao";
import { RecordUpdateStageDao } from "./dao/RecordUpdateStageDao";
const movingWalkway = lib('layover');
export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token({
    class: RecordUpdateStageDao,
    interface: 'IRecordUpdateStageDao',
    token: 'RECORD_UPDATE_STAGE_DAO'
});
export const SYNCHRONIZATION_CONFLICT_DAO = movingWalkway.token({
    class: SynchronizationConflictDao,
    interface: 'ISynchronizationConflictDao',
    token: 'SYNCHRONIZATION_CONFLICT_DAO'
});
export const SYNCHRONIZATION_CONFLICT_VALUES_DAO = movingWalkway.token({
    class: SynchronizationConflictValuesDao,
    interface: 'ISynchronizationConflictValuesDao',
    token: 'SYNCHRONIZATION_CONFLICT_VALUES_DAO'
});
//# sourceMappingURL=tokens.js.map