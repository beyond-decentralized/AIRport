"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RepoTransBlockResponseStageDao extends generated_1.BaseRepoTransBlockResponseStageDao {
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RepoTransBlockResponseStage;
        let smrs;
        return await this.airDb.db.insertValues(dbEntity, {
            insertInto: smrs = generated_1.Q.RepoTransBlockResponseStage,
            columns: [
                smrs.id,
                // smrs.agtSyncRecordId,
                smrs.syncOutcomeType
            ],
            values
        });
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: generated_1.Q.RepoTransBlockResponseStage
        });
    }
}
exports.RepoTransBlockResponseStageDao = RepoTransBlockResponseStageDao;
di_1.DI.set(diTokens_1.REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO, RepoTransBlockResponseStageDao);
//# sourceMappingURL=RepoTransBlockResponseStageDao.js.map