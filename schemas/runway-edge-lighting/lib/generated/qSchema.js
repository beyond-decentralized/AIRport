"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const LogEntry_1 = require("../ddl/LogEntry");
const LogEntryType_1 = require("../ddl/LogEntryType");
const LogEntryValue_1 = require("../ddl/LogEntryValue");
const LoggedError_1 = require("../ddl/LoggedError");
const LoggedErrorStackTrace_1 = require("../ddl/LoggedErrorStackTrace");
const __constructors__ = {
    LogEntry: LogEntry_1.LogEntry,
    LogEntryType: LogEntryType_1.LogEntryType,
    LogEntryValue: LogEntryValue_1.LogEntryValue,
    LoggedError: LoggedError_1.LoggedError,
    LoggedErrorStackTrace: LoggedErrorStackTrace_1.LoggedErrorStackTrace
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'npmjs.org',
    name: '@airport/runway-edge-lighting'
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