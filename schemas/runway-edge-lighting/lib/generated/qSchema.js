"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const logentry_1 = require("../ddl/logentry");
const logentrytype_1 = require("../ddl/logentrytype");
const logentryvalue_1 = require("../ddl/logentryvalue");
const loggederror_1 = require("../ddl/loggederror");
const loggederrorstacktrace_1 = require("../ddl/loggederrorstacktrace");
const __constructors__ = {
    LogEntry: logentry_1.LogEntry,
    LogEntryType: logentrytype_1.LogEntryType,
    LogEntryValue: logentryvalue_1.LogEntryValue,
    LoggedError: loggederror_1.LoggedError,
    LoggedErrorStackTrace: loggederrorstacktrace_1.LoggedErrorStackTrace
};
exports.Q_SCHEMA = {
    __constructors__,
    domain: 'github.com',
    name: '@airport/runway-edge-lighting'
};
exports.Q = exports.Q_SCHEMA;
di_1.DI.get((airportDatabase) => {
    airportDatabase.QM[ground_control_1.getSchemaName(exports.Q_SCHEMA)] = exports.Q;
}, air_control_1.AIR_DB);
//# sourceMappingURL=qSchema.js.map