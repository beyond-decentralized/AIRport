import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { DailySyncLog, Log, MonthlySyncLog } from '../ddl/ddl';
const __constructors__ = {
    DailySyncLog: DailySyncLog,
    Log: Log,
    MonthlySyncLog: MonthlySyncLog
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'air',
    name: '@airport/flight-log-archive'
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