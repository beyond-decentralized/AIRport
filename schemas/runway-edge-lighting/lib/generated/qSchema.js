import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { LogEntry, LogEntryType, LogEntryValue, LoggedError, LoggedErrorStackTrace } from '../ddl/ddl';
const __constructors__ = {
    LogEntry: LogEntry,
    LogEntryType: LogEntryType,
    LogEntryValue: LogEntryValue,
    LoggedError: LoggedError,
    LoggedErrorStackTrace: LoggedErrorStackTrace
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'air',
    name: '@airport/runway-edge-lighting'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbSchema__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbSchema__, dbEntityId);
}
DI.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getSchemaName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map