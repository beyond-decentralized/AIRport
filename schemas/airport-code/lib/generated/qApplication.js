import { airApi } from '@airport/aviation-communication';
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
    return airApi.dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return airApi.ddS(Q.__dbApplication__, dbEntityId);
}
airApi.setQApplication(Q_APPLICATION);
//# sourceMappingURL=qApplication.js.map