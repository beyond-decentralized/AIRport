import { AIRPORT_DATABASE } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getApplicationName } from '@airport/ground-control';
import { Level1, Level2 } from '../ddl/ddl';
const __constructors__ = {
    Level1: Level1,
    Level2: Level2
};
export const Q_APPLICATION = {
    __constructors__,
    domain: 'air',
    name: '@airport/functionality-demo-schema'
};
export const Q = Q_APPLICATION;
export function diSet(dbEntityId) {
    return dS(Q.__dbApplication__, dbEntityId);
}
export function duoDiSet(dbEntityId) {
    return ddS(Q.__dbApplication__, dbEntityId);
}
DI.db().eventuallyGet(AIRPORT_DATABASE).then((airDb) => {
    airDb.QM[getApplicationName(Q_APPLICATION)] = Q;
});
//# sourceMappingURL=qApplication.js.map