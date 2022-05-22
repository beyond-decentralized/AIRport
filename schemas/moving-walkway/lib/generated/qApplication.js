import { airApi } from '@airport/aviation-communication';
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
    return airApi.dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return airApi.ddS(Q.__dbApplication__, dbEntityId);
}
airApi.setQApplication(Q_APPLICATION);
//# sourceMappingURL=qApplication.js.map