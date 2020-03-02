"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const baseDaos_1 = require("../generated/baseDaos");
class LogEntryValueDao extends baseDaos_1.BaseLogEntryValueDao {
}
exports.LogEntryValueDao = LogEntryValueDao;
di_1.DI.set(tokens_1.LOG_ENTRY_VALUE_DAO, LogEntryValueDao);
//# sourceMappingURL=LogEntryValueDao.js.map