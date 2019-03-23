"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const baseDaos_1 = require("../generated/baseDaos");
class LogEntryValueDao extends baseDaos_1.BaseLogEntryValueDao {
}
exports.LogEntryValueDao = LogEntryValueDao;
di_1.DI.set(diTokens_1.LOG_ENTRY_VALUE_DAO, LogEntryValueDao);
//# sourceMappingURL=LogEntryValueDao.js.map