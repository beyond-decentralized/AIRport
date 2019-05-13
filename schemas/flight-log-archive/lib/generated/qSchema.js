"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    domain: 'github.com',
    name: '@airport/flight-log-archive'
};
exports.Q = exports.Q_SCHEMA;
//# sourceMappingURL=qSchema.js.map