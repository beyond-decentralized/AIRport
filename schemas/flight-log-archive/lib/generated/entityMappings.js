/* eslint-disable */
import { AIRPORT_DATABASE } from '@airport/air-control';
import { DI } from '@airport/di';
import { DailySyncLog } from '../ddl/DailySyncLog';
import { Log } from '../ddl/log/Log';
import { MonthlySyncLog } from '../ddl/MonthlySyncLog';
DI.db().get(AIRPORT_DATABASE).then(airDb => {
    const accumulator = airDb.getAccumulator('air', 'flight-log-archive');
    accumulator.add(DailySyncLog, 0);
    accumulator.add(Log, 1);
    accumulator.add(MonthlySyncLog, 2);
});
//# sourceMappingURL=entityMappings.js.map