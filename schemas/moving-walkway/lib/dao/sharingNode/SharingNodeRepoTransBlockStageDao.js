"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class SharingNodeRepoTransBlockStageDao extends generated_1.BaseSharingNodeRepoTransBlockStageDao {
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlockStage;
        let snrtbs;
        return await this.airDb.db.insertValues(dbEntity, {
            insertInto: snrtbs = generated_1.Q.SharingNodeRepoTransBlockStage,
            columns: [
                snrtbs.sharingNodeId,
                snrtbs.repositoryTransactionBlockId,
                // snrtbs.syncStatus,
                snrtbs.syncStatus
            ],
            values
        });
    }
    async delete( //
    ) {
        return await this.db.deleteWhere({
            deleteFrom: generated_1.Q.SharingNodeRepoTransBlockStage
        });
    }
}
exports.SharingNodeRepoTransBlockStageDao = SharingNodeRepoTransBlockStageDao;
di_1.DI.set(diTokens_1.SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO, SharingNodeRepoTransBlockStageDao);
//# sourceMappingURL=SharingNodeRepoTransBlockStageDao.js.map