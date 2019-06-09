"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const application_1 = require("../ddl/application");
const applicationpackage_1 = require("../ddl/applicationpackage");
const domain_1 = require("../ddl/domain");
const package_1 = require("../ddl/package");
const packagedunit_1 = require("../ddl/packagedunit");
const __constructors__ = {
    Application: application_1.Application,
    ApplicationPackage: applicationpackage_1.ApplicationPackage,
    Domain: domain_1.Domain,
    Package: package_1.Package,
    PackagedUnit: packagedunit_1.PackagedUnit
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'github.com',
    name: '@airport/territory'
};
exports.Q = exports.Q_SCHEMA;
function diSet(dbEntityId) {
    return check_in_1.diSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.diSet = diSet;
di_1.DI.get((airportDatabase) => {
    airportDatabase.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
}, air_control_1.AIR_DB);
//# sourceMappingURL=qSchema.js.map