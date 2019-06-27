"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const dailyarchive_1 = require("../ddl/dailyarchive");
const __constructors__ = {
    DailyArchive: dailyarchive_1.DailyArchive
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'github.com',
    name: '@airport/point-of-destination'
};
exports.Q = exports.Q_SCHEMA;
function diSet(dbEntityId) {
    return check_in_1.diSet(exports.Q.__dbSchema__, dbEntityId);
}
exports.diSet = diSet;
di_1.DI.get(air_control_1.AIR_DB).then((airDb) => {
    airDb.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
});
//# sourceMappingURL=qSchema.js.map