/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { RecordUpdateStage } from '../ddl/RecordUpdateStage';
import { SynchronizationConflictValues } from '../ddl/conflict/SynchronizationConflictValues';
import { SynchronizationConflict } from '../ddl/conflict/SynchronizationConflict';

DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'layover');
  accumulator.add(RecordUpdateStage, 0);
  accumulator.add(SynchronizationConflictValues, 1);
  accumulator.add(SynchronizationConflict, 2);
});
