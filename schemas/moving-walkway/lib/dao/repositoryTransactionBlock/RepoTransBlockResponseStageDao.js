"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
class RepoTransBlockResponseStageDao extends generated_1.BaseRepoTransBlockResponseStageDao {
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RepoTransBlockResponseStage;
        let smrs;
        const airDb = await di_1.container(this).get(air_control_1.AIR_DB);
        return await airDb.insertValues(dbEntity, {
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
di_1.DI.set(tokens_1.REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO, RepoTransBlockResponseStageDao);
//# sourceMappingURL=RepoTransBlockResponseStageDao.js.map