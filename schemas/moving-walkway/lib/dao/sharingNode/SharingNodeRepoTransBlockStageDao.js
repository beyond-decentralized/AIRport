import { AIRPORT_DATABASE } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { BaseSharingNodeRepoTransBlockStageDao, Q } from '../../generated/generated';
import { SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO } from '../../tokens';
export class SharingNodeRepoTransBlockStageDao extends BaseSharingNodeRepoTransBlockStageDao {
    async insertValues(values) {
        const dbEntity = Q.db.currentVersion[0].schemaVersion
            .entityMapByName.SharingNodeRepoTransBlockStage;
        const airDb = await container(this)
            .get(AIRPORT_DATABASE);
        let snrtbs;
        return await airDb.insertValues({
            insertInto: snrtbs = Q.SharingNodeRepoTransBlockStage,
            columns: [
                snrtbs.sharingNodeId,
                snrtbs.repositoryTransactionBlockId,
                // snrtbs.syncStatus,
                snrtbs.syncStatus
            ],
            values
        }, {
            dbEntity
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