"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
const baseDaos_1 = require("../../generated/baseDaos");
class RepositoryDao extends baseDaos_1.BaseRepositoryDao {
}
exports.RepositoryDao = RepositoryDao;
di_1.DI.set(tokens_1.REPOSITORY_DAO, RepositoryDao);
//# sourceMappingURL=RepositoryDao.js.map