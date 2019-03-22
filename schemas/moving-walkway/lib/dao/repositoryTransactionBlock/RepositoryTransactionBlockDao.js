"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RepositoryTransactionBlockDao extends generated_1.BaseRepositoryTransactionBlockDao {
    constructor() {
        super();
        di_1.DI.get((dmo) => {
            this.dmo = dmo;
        }, diTokens_1.REPO_TRANS_BLOCK_DMO);
    }
    async updateFromResponseStage( //
    ) {
        let rtb;
        // let rtbrs1: QRepoTransBlockResponseStage;
        let rtbrs2;
        return await this.db.updateWhere({
            update: rtb = generated_1.Q.RepositoryTransactionBlock,
            set: {
                // agtSyncRecordId: field({
                // 	from: [
                // 		rtbrs1 = Q.RepoTransBlockResponseStage
                // 	],
                // 	select: rtbrs1.agtSyncRecordId,
                // 	where: rtbrs1.id.equals(rtb.id)
                // }),
                syncOutcomeType: air_control_1.field({
                    from: [
                        rtbrs2 = generated_1.Q.RepoTransBlockResponseStage
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
            select: air_control_1.distinct({}),
            from: [
                rtb = generated_1.Q.RepositoryTransactionBlock,
                mrrtb = rtb.missingRecordRepoTransBlocks.innerJoin(),
                mr = mrrtb.missingRecord.innerJoin()
            ],
            where: air_control_1.and(mr.id.in(missingRecordIds), air_control_1.not(mr.status.equals(status)))
        });
    }
    async clearContentsWhereIdsIn(repositoryTransactionBlockIds) {
        const rtb = generated_1.Q.QRepositoryTransactionBlock;
        await this.db.updateWhere({
            update: rtb,
            set: {
                contents: null
            },
            where: rtb.id.in(repositoryTransactionBlockIds)
        });
    }
}
exports.RepositoryTransactionBlockDao = RepositoryTransactionBlockDao;
di_1.DI.set(diTokens_1.REPO_TRANS_BLOCK_DAO, RepositoryTransactionBlockDao);
//# sourceMappingURL=RepositoryTransactionBlockDao.js.map