"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const dailysynclog_1 = require("../ddl/dailysynclog");
const log_1 = require("../ddl/log/log");
const monthlysynclog_1 = require("../ddl/monthlysynclog");
const __constructors__ = {
    DailySyncLog: dailysynclog_1.DailySyncLog,
    Log: log_1.Log,
    MonthlySyncLog: monthlysynclog_1.MonthlySyncLog
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/flight-log-archive'
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
di_1.DI.get(air_control_1.AIR_DB).then((airDb) => {
    airDb.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
});
//# sourceMappingURL=qSchema.js.map