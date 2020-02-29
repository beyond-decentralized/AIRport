import { AIR_DB } from '@airport/air-control';
import { diSet as dS, duoDiSet as ddS } from '@airport/check-in';
import { DI } from '@airport/di';
import { getSchemaName } from '@airport/ground-control';
import { Application } from '../ddl/Application';
import { ApplicationPackage } from '../ddl/ApplicationPackage';
import { Domain } from '../ddl/Domain';
import { Package } from '../ddl/Package';
import { PackagedUnit } from '../ddl/PackagedUnit';
const __constructors__ = {
    Application: Application,
    ApplicationPackage: ApplicationPackage,
    Domain: Domain,
    Package: Package,
    PackagedUnit: PackagedUnit
};
export const Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/territory'
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