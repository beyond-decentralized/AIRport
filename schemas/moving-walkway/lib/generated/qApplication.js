import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { getFullApplicationName } from '@airport/ground-control';
import { RecordUpdateStage, SynchronizationConflict, SynchronizationConflictValues } from '../ddl/ddl';
const __constructors__ = {
    RecordUpdateStage: RecordUpdateStage,
    SynchronizationConflict: SynchronizationConflict,
    SynchronizationConflictValues: SynchronizationConflictValues
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/moving-walkway'
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