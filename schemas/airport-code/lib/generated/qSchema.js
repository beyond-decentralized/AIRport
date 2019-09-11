"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const sequence_1 = require("../ddl/sequence");
const systemwideoperationid_1 = require("../ddl/systemwideoperationid");
const terminalrun_1 = require("../ddl/terminalrun");
const __constructors__ = {
    Sequence: sequence_1.Sequence,
    SystemWideOperationId: systemwideoperationid_1.SystemWideOperationId,
    TerminalRun: terminalrun_1.TerminalRun
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/airport-code'
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