/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { Sequence } from '../ddl/Sequence';
import { SystemWideOperationId } from '../ddl/SystemWideOperationId';
import { TerminalRun } from '../ddl/TerminalRun';

DEPENDENCY_INJECTION.db().get(AIRPORT_DATABASE).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'airport-code');
  accumulator.add(Sequence, 0);
  accumulator.add(SystemWideOperationId, 1);
  accumulator.add(TerminalRun, 2);
});
