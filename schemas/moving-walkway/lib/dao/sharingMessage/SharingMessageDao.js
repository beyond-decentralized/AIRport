"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const holding_pattern_1 = require("@airport/holding-pattern");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class SharingMessageDao extends generated_1.BaseSharingMessageDao {
    constructor() {
        super();
        di_1.DI.get((repositoryTransactionHistoryDao, recordHistoryNewValueDao, recordHistoryOldValueDao) => {
            this.repoTransHistoryDao = repositoryTransactionHistoryDao;
            this.recHistNewValueDao = recordHistoryNewValueDao;
            this.recHistOldValueDao = recordHistoryOldValueDao;
        }, holding_pattern_1.REPO_TRANS_HISTORY_DAO, holding_pattern_1.REC_HIST_NEW_VALUE_DAO, holding_pattern_1.REC_HIST_OLD_VALUE_DAO);
    }
    /*
    async updateSyncStatusByAgtSharingMessageIds(
        messageSyncStatus: MessageSyncStatus,
        agtTerminalSyncLogIds: AgtSharingMessageId[]
    ): Promise<void> {
        let sm: QSharingMessage;
        await this.db.updateWhere({
            update: sm = Q.SharingMessage,
            set: {
                messageSyncStatus
            },
            where: sm.agtTerminalSyncLogId.in(agtTerminalSyncLogIds)
        });
    }
*/
    /*
        async updateFromResponseStage( //
        ): Promise<number> {
            let sm: QSharingMessage;
            let smrs1: QSharingMessageResponseStage;
            let smrs2: QSharingMessageResponseStage;
            return await this.db.updateWhere({
                update: sm = Q.SharingMessage,
                set: {
                    agtTerminalSyncLogId: field({
                        from: [
                            smrs1 = Q.SharingMessageResponseStage
                        ],
                        select: smrs1.agtTerminalSyncLogId,
                        where: smrs1.id.equals(sm.id)
                    }),
                    syncStatus: SyncStatus.SYNCHRONIZED,
                    syncTimestamp: field({
                        from: [
                            smrs2 = Q.SharingMessageResponseStage
                        ],
                        select: smrs2.syncTimestamp,
                        where: smrs2.id.equals(sm.id)
                    })
                }
            });
        }*/
    async findAllSyncedSharingMessageIdsForSharingNodes(sharingNodeIds) {
        const sharingMessageIdsBySharingNodeId = new Map();
        let sm;
        const data = await this.airDb.find.sheet({
            from: [
                sm = generated_1.Q.SharingMessage
            ],
            select: [
                sm.sharingNode.id,
                sm.id
            ],
            where: sm.sharingNode.id.in(sharingNodeIds)
        });
        for (const record of data) {
            this.utils.ensureChildArray(sharingMessageIdsBySharingNodeId, record[0])
                .push(record[1]);
        }
        return sharingMessageIdsBySharingNodeId;
    }
}
exports.SharingMessageDao = SharingMessageDao;
di_1.DI.set(diTokens_1.SHARING_MESSAGE_DAO, SharingMessageDao);
//# sourceMappingURL=SharingMessageDao.js.map