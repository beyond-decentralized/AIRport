"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const baseDaos_1 = require("../generated/baseDaos");
class LogEntryDao extends baseDaos_1.BaseLogEntryDao {
}
exports.LogEntryDao = LogEntryDao;
di_1.DI.set(tokens_1.LOG_ENTRY_DAO, LogEntryDao);
//# sourceMappingURL=LogEntryDao.js.map