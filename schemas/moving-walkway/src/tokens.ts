import { lib } from '@airport/direction-indicator'
import { ISynchronizationConflictDao } from "./dao/conflict/SynchronizationConflictDao";
import { ISynchronizationConflictValuesDao } from "./dao/conflict/SynchronizationConflictValuesDao";
import { IRecordUpdateStageDao } from "./dao/RecordUpdateStageDao";

const movingWalkway = lib('moving-walkway')

export const RECORD_UPDATE_STAGE_DAO = movingWalkway.token<IRecordUpdateStageDao>('RECORD_UPDATE_STAGE_DAO');
export const SYNCHRONIZATION_CONFLICT_DAO
	= movingWalkway.token<ISynchronizationConflictDao>('SYNCHRONIZATION_CONFLICT_DAO');
export const SYNCHRONIZATION_CONFLICT_VALUES_DAO
	= movingWalkway.token<ISynchronizationConflictValuesDao>('SYNCHRONIZATION_CONFLICT_VALUES_DAO');
