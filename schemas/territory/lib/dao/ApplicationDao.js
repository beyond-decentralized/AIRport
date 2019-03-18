"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const baseDaos_1 = require("../generated/baseDaos");
const diTokens_1 = require("../diTokens");
class ApplicationDao extends baseDaos_1.BaseApplicationDao {
}
exports.ApplicationDao = ApplicationDao;
di_1.DI.set(diTokens_1.APPLICATION_DAO, ApplicationDao);
//# sourceMappingURL=ApplicationDao.js.map