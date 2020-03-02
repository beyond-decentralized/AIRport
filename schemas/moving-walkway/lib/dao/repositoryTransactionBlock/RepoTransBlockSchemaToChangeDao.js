"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
class RepoTransBlockSchemaToChangeDao extends generated_1.BaseRepoTransBlockSchemaToChangeDao {
}
exports.RepoTransBlockSchemaToChangeDao = RepoTransBlockSchemaToChangeDao;
di_1.DI.set(tokens_1.REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO, RepoTransBlockSchemaToChangeDao);
//# sourceMappingURL=RepoTransBlockSchemaToChangeDao.js.map