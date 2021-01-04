import { AIR_DB } from '@airport/air-control';
import { DI } from '@airport/di';
import { LogEntryType } from '../ddl/LogEntryType';
import { LogEntryValue } from '../ddl/LogEntryValue';
import { LogEntry } from '../ddl/LogEntry';
import { LoggedErrorStackTrace } from '../ddl/LoggedErrorStackTrace';
import { LoggedError } from '../ddl/LoggedError';

DI.db().get(AIR_DB).then(airDb => {
  const accumulator = airDb.getAccumulator('air', 'runway-edge-lighting');
  accumulator.add(LogEntryType, 0);
  accumulator.add(LogEntryValue, 1);
  accumulator.add(LogEntry, 2);
  accumulator.add(LoggedErrorStackTrace, 3);
  accumulator.add(LoggedError, 4);
});
