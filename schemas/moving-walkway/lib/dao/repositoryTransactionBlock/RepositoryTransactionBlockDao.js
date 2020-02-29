import { and, distinct, field, not, } from '@airport/air-control';
import { DI } from '@airport/di';
import { REPO_TRANS_BLOCK_DAO } from '../../tokens';
import { BaseRepositoryTransactionBlockDao, Q, } from '../../generated/generated';
export class RepositoryTransactionBlockDao extends BaseRepositoryTransactionBlockDao {
    async updateFromResponseStage( //
    ) {
        let rtb;
        // let rtbrs1: QRepoTransBlockResponseStage;
        let rtbrs2;
        return await this.db.updateWhere({
            update: rtb = Q.RepositoryTransactionBlock,
            set: {
                // agtSyncRecordId: field({
                // 	from: [
                // 		rtbrs1 = Q.RepoTransBlockResponseStage
                // 	],
                // 	select: rtbrs1.agtSyncRecordId,
                // 	where: rtbrs1.id.equals(rtb.id)
                // }),
                syncOutcomeType: field({
                    from: [
                        rtbrs2 = Q.RepoTransBlockResponseStage
                    ],
                    select: rtbrs2.syncOutcomeType,
                    where: rtbrs2.id.equals(rtb.id)
                })
            }
        });
    }
    async findWithMissingRecordIdsAndNoMissingRecordsWithStatus(missingRecordIds, status) {
        let rtb, mrrtb, mr;
        return await this.db.find.tree({
            select: distinct({}),
            from: [
                rtb = Q.RepositoryTransactionBlock,
                mrrtb = rtb.missingRecordRepoTransBlocks.innerJoin(),
                mr = mrrtb.missingRecord.innerJoin()
            ],
            where: and(mr.id.in(missingRecordIds), not(mr.status.equals(status)))
        });
    }
    async clearContentsWhereIdsIn(repositoryTransactionBlockIds) {
        const rtb = Q.QRepositoryTransactionBlock;
        await this.db.updateWhere({
            update: rtb,
            set: {
                contents: null
            },
            where: rtb.id.in(repositoryTransactionBlockIds)
        });
    }
}
DI.set(REPO_TRANS_BLOCK_DAO, RepositoryTransactionBlockDao);
//# sourceMappingURL=RepositoryTransactionBlockDao.js.map