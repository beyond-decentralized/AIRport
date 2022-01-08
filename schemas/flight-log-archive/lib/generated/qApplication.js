import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getFullApplicationName } from '@airport/ground-control';
import { DailySyncLog, Log, MonthlySyncLog } from '../ddl/ddl';
const __constructors__ = {
    DailySyncLog: DailySyncLog,
    Log: Log,
    MonthlySyncLog: MonthlySyncLog
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/flight-log-archive'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DI.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q;
});
//# sourceMappingURL=qApplication.js.map