import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { Sequence, SystemWideOperationId, TerminalRun } from '../ddl/ddl';
const __constructors__ = {
    Sequence: Sequence,
    SystemWideOperationId: SystemWideOperationId,
    TerminalRun: TerminalRun
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'air',
    name: '@airport/airport-code'
};
export const Q = Q_SCHEMA;
export function diSet(dbEntityId) {
    return dS(Q.__dbSchema__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbSchema__, dbEntityId);
}
DI.db().eventuallyGet(AIR_DB).then((airDb) => {
    airDb.QM[getSchemaName(Q_SCHEMA)] = Q;
});
//# sourceMappingURL=qSchema.js.map