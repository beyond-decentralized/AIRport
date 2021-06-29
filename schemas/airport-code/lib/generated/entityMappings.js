import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { Sequence } from '../ddl/sequence';
import { SystemWideOperationId } from '../ddl/systemwideoperationid';
import { TerminalRun } from '../ddl/terminalrun';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'airport-code');
    accumulator.add(Sequence, 0);
    accumulator.add(SystemWideOperationId, 1);
    accumulator.add(TerminalRun, 2);
});
//# sourceMappingURL=entityMappings.js.map