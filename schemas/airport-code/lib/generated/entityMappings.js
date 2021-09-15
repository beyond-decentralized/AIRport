/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { Sequence } from '../ddl/Sequence';
import { SystemWideOperationId } from '../ddl/SystemWideOperationId';
import { TerminalRun } from '../ddl/TerminalRun';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'airport-code');
    accumulator.add(Sequence, 0);
    accumulator.add(SystemWideOperationId, 1);
    accumulator.add(TerminalRun, 2);
});
//# sourceMappingURL=entityMappings.js.map