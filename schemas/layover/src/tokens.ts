import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { lib } from '@airport/direction-indicator'
import { ISynchronizationConflictDao, SynchronizationConflictDao } from "./dao/conflict/SynchronizationConflictDao";
import { ISynchronizationConflictValuesDao, SynchronizationConflictValuesDao } from "./dao/conflict/SynchronizationConflictValuesDao";
import { IRecordUpdateStageDao, RecordUpdateStageDao } from "./dao/RecordUpdateStageDao";

const layover = lib('layover')

export const RECORD_UPDATE_STAGE_DAO = layover.token<IRecordUpdateStageDao>({
	class: RecordUpdateStageDao,
	interface: 'IRecordUpdateStageDao',
	token: 'RECORD_UPDATE_STAGE_DAO'
});
export const SYNCHRONIZATION_CONFLICT_DAO
	= layover.token<ISynchronizationConflictDao>({
		class: SynchronizationConflictDao,
		interface: 'ISynchronizationConflictDao',
		token: 'SYNCHRONIZATION_CONFLICT_DAO'
	});
export const SYNCHRONIZATION_CONFLICT_VALUES_DAO
	= layover.token<ISynchronizationConflictValuesDao>({
		class: SynchronizationConflictValuesDao,
		interface: 'ISynchronizationConflictValuesDao',
		token: 'SYNCHRONIZATION_CONFLICT_VALUES_DAO'
	});

RECORD_UPDATE_STAGE_DAO.setDependencies({
	airportDatabase: AIRPORT_DATABASE
})