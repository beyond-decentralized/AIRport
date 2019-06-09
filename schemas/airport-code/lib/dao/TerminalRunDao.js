"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const generated_1 = require("../generated/generated");
class TerminalRunDao extends generated_1.BaseTerminalRunDao {
}
exports.TerminalRunDao = TerminalRunDao;
di_1.DI.set(diTokens_1.TERMINAL_RUN_DAO, TerminalRunDao);
//# sourceMappingURL=TerminalRunDao.js.map