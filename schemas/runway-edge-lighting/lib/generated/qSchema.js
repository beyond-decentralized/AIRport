import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { LogEntry } from '../ddl/LogEntry';
import { LogEntryType } from '../ddl/LogEntryType';
import { LogEntryValue } from '../ddl/LogEntryValue';
import { LoggedError } from '../ddl/LoggedError';
import { LoggedErrorStackTrace } from '../ddl/LoggedErrorStackTrace';
const __constructors__ = {
    LogEntry: LogEntry,
    LogEntryType: LogEntryType,
    LogEntryValue: LogEntryValue,
    LoggedError: LoggedError,
    LoggedErrorStackTrace: LoggedErrorStackTrace
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/runway-edge-lighting'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbSchema__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbSchema__, dbEntityId);
}
DI.db().get(AIR_DB).then((airDb) => {
    airDb.QM[getSchemaName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map