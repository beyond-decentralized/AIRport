"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class SharingMessageDao extends generated_1.BaseSharingMessageDao {
    // private repoTransHistoryDao: IRepositoryTransactionHistoryDao
    // private recHistNewValueDao: IRecordHistoryNewValueDao
    // private recHistOldValueDao: IRecordHistoryOldValueDao
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
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        let sm;
        const data = await airDb.find.sheet({
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
            ground_control_1.ensureChildArray(sharingMessageIdsBySharingNodeId, record[0])
                .push(record[1]);
        }
        return sharingMessageIdsBySharingNodeId;
    }
}
exports.SharingMessageDao = SharingMessageDao;
di_1.DI.set(diTokens_1.SHARING_MESSAGE_DAO, SharingMessageDao);
//# sourceMappingURL=SharingMessageDao.js.map