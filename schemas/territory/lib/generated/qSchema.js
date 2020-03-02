"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const Application_1 = require("../ddl/Application");
const ApplicationPackage_1 = require("../ddl/ApplicationPackage");
const Domain_1 = require("../ddl/Domain");
const Package_1 = require("../ddl/Package");
const PackagedUnit_1 = require("../ddl/PackagedUnit");
const __constructors__ = {
    Application: Application_1.Application,
    ApplicationPackage: ApplicationPackage_1.ApplicationPackage,
    Domain: Domain_1.Domain,
    Package: Package_1.Package,
    PackagedUnit: PackagedUnit_1.PackagedUnit
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/territory'
};
exports.Q = exports.Q_SCHEMA;
function diSet(dbEntityId) {
    return check_in_1.diSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.diSet = diSet;
function duoDiSet(dbEntityId) {
    return check_in_1.duoDiSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.duoDiSet = duoDiSet;
di_1.DI.db().get(air_control_1.AIR_DB).then((airDb) => {
    airDb.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
});
//# sourceMappingURL=qSchema.js.map