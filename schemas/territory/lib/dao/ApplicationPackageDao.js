"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const baseDaos_1 = require("../generated/baseDaos");
const diTokens_1 = require("../diTokens");
class ApplicationPackageDao extends baseDaos_1.BaseApplicationPackageDao {
}
exports.ApplicationPackageDao = ApplicationPackageDao;
di_1.DI.set(diTokens_1.APPLICATION_PACKAGE_DAO, ApplicationPackageDao);
//# sourceMappingURL=ApplicationPackageDao.js.map