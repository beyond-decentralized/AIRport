import { AIR_DB } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO } from '../../tokens';
import { BaseRepoTransBlockResponseStageDao, Q } from '../../generated/generated';
export class RepoTransBlockResponseStageDao extends BaseRepoTransBlockResponseStageDao {
    async insertValues(values) {
        const dbEntity = Q.db.currentVersion.entityMapByName.RepoTransBlockResponseStage;
        let smrs;
        const airDb = await container(this).get(AIR_DB);
        return await airDb.insertValues(dbEntity, {
            insertInto: smrs = Q.RepoTransBlockResponseStage,
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
            deleteFrom: Q.RepoTransBlockResponseStage
        });
    }
}
DI.set(REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO, RepoTransBlockResponseStageDao);
//# sourceMappingURL=RepoTransBlockResponseStageDao.js.map