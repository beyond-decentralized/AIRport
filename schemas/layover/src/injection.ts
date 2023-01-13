import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { lib } from '@airport/direction-indicator'
import { Dictionary } from '@airport/ground-control';
import { SynchronizationConflictDao } from "./dao/conflict/SynchronizationConflictDao";
import { SynchronizationConflictValuesDao } from "./dao/conflict/SynchronizationConflictValuesDao";
import { RecordUpdateStageDao } from "./dao/RecordUpdateStageDao";

const layover = lib('@airport/layover')

layover.register(
	RecordUpdateStageDao, SynchronizationConflictDao, SynchronizationConflictValuesDao
)

layover.setDependencies(RecordUpdateStageDao, {
	airportDatabase: AIRPORT_DATABASE,
	dictionary: Dictionary
})