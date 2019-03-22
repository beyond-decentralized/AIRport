"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const baseDaos_1 = require("../../generated/baseDaos");
class RepositoryDao extends baseDaos_1.BaseRepositoryDao {
}
exports.RepositoryDao = RepositoryDao;
di_1.DI.set(diTokens_1.REPOSITORY_DAO, RepositoryDao);
//# sourceMappingURL=RepositoryDao.js.map