"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const baseDaos_1 = require("../generated/baseDaos");
class LogEntryDao extends baseDaos_1.BaseLogEntryDao {
}
exports.LogEntryDao = LogEntryDao;
di_1.DI.set(diTokens_1.LOG_ENTRY_DAO, LogEntryDao);
//# sourceMappingURL=LogEntryDao.js.map