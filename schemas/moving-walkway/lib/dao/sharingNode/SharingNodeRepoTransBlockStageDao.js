import { AIR_DB } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO } from '../../tokens';
import { BaseSharingNodeRepoTransBlockStageDao, Q } from '../../generated/generated';
export class SharingNodeRepoTransBlockStageDao extends BaseSharingNodeRepoTransBlockStageDao {
    async insertValues(values) {
        const dbEntity = Q.db.currentVersion.entityMapByName.SharingNodeRepoTransBlockStage;
        const airDb = await container(this).get(AIR_DB);
        let snrtbs;
        return await airDb.insertValues(dbEntity, {
            insertInto: snrtbs = Q.SharingNodeRepoTransBlockStage,
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
            deleteFrom: Q.SharingNodeRepoTransBlockStage
        });
    }
}
DI.set(SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO, SharingNodeRepoTransBlockStageDao);
//# sourceMappingURL=SharingNodeRepoTransBlockStageDao.js.map