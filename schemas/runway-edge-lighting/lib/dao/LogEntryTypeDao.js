"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../tokens");
const baseDaos_1 = require("../generated/baseDaos");
class LogEntryTypeDao extends baseDaos_1.BaseLogEntryTypeDao {
}
exports.LogEntryTypeDao = LogEntryTypeDao;
di_1.DI.set(tokens_1.LOG_ENTRY_TYPE_DAO, LogEntryTypeDao);
//# sourceMappingURL=LogEntryTypeDao.js.map