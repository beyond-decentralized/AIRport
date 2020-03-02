"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const flightLogArchive = di_1.system('airport').lib('flight-log-archive');
exports.DAILY_SYNC_LOG_DAO = flightLogArchive.token();
exports.MONTHLY_SYNC_LOG_DAO = flightLogArchive.token();
//# sourceMappingURL=tokens.js.map