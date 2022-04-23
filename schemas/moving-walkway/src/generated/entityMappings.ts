/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { SynchronizationConflictValues } from '../ddl/conflict/SynchronizationConflictValues';
import { SynchronizationConflict } from '../ddl/conflict/SynchronizationConflict';
import { RecordUpdateStage } from '../ddl/RecordUpdateStage';

DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'moving-walkway');
  accumulator.add(SynchronizationConflictValues, 0);
  accumulator.add(SynchronizationConflict, 1);
  accumulator.add(RecordUpdateStage, 2);
});
