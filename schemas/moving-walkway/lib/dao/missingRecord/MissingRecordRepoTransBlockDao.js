"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
class MissingRecordRepoTransBlockDao extends generated_1.BaseMissingRecordRepoTransBlockDao {
    async deleteWhereMissingRecordIdsIn(missingRecordIds) {
        let mrrtb;
        await this.db.deleteWhere({
            deleteFrom: mrrtb = generated_1.Q.MissingRecordSharingMessage,
            where: mrrtb.missingRecord.id.in(missingRecordIds)
        });
    }
}
exports.MissingRecordRepoTransBlockDao = MissingRecordRepoTransBlockDao;
di_1.DI.set(tokens_1.MISSING_RECORD_REPO_TRANS_BLOCK_DAO, MissingRecordRepoTransBlockDao);
//# sourceMappingURL=MissingRecordRepoTransBlockDao.js.map