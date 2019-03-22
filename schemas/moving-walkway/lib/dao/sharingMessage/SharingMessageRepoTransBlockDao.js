"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class SharingMessageRepoTransBlockDao extends generated_1.BaseSharingMessageRepoTransBlockDao {
}
exports.SharingMessageRepoTransBlockDao = SharingMessageRepoTransBlockDao;
di_1.DI.set(diTokens_1.SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, SharingMessageRepoTransBlockDao);
//# sourceMappingURL=SharingMessageRepoTransBlockDao.js.map