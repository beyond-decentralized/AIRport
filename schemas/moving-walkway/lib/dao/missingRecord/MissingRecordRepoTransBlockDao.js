import { DI } from '@airport/di';
import { MISSING_RECORD_REPO_TRANS_BLOCK_DAO } from '../../tokens';
import { BaseMissingRecordRepoTransBlockDao, Q } from '../../generated/generated';
export class MissingRecordRepoTransBlockDao extends BaseMissingRecordRepoTransBlockDao {
    async deleteWhereMissingRecordIdsIn(missingRecordIds) {
        let mrrtb;
        await this.db.deleteWhere({
            deleteFrom: mrrtb = Q.MissingRecordSharingMessage,
            where: mrrtb.missingRecord.id.in(missingRecordIds)
        });
    }
}
DI.set(MISSING_RECORD_REPO_TRANS_BLOCK_DAO, MissingRecordRepoTransBlockDao);
//# sourceMappingURL=MissingRecordRepoTransBlockDao.js.map