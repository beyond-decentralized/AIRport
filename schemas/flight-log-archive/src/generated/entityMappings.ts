import { AIR_DB } from '@airport/air-control';
import { DI } from '@airport/di';
import { DailySyncLog } from '../ddl/DailySyncLog';
import { MonthlySyncLog } from '../ddl/MonthlySyncLog';
import { Log } from '../ddl/log/Log';

DI.db().get(AIR_DB).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'flight-log-archive');
  accumulator.add(DailySyncLog, 0);
  accumulator.add(MonthlySyncLog, 1);
  accumulator.add(Log, 2);
});
