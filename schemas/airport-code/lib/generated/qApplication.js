import { AIRPORT_DATABASE } from '@airport/air-traffic-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { getFullApplicationName } from '@airport/ground-control';
import { Sequence, SystemWideOperationId, TerminalRun } from '../ddl/ddl';
const __constructors__ = {
    Sequence: Sequence,
    SystemWideOperationId: SystemWideOperationId,
    TerminalRun: TerminalRun
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/airport-code'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DEPENDENCY_INJECTION.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getFullApplicationName(Q_APPLICATION)] = Q;
});
//# sourceMappingURL=qApplication.js.map