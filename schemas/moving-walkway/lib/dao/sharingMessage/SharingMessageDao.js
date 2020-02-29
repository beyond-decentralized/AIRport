import { AIR_DB } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { ensureChildArray } from '@airport/ground-control';
import { SHARING_MESSAGE_DAO } from '../../tokens';
import { BaseSharingMessageDao, Q, } from '../../generated/generated';
export class SharingMessageDao extends BaseSharingMessageDao {
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
        const airDb = await container(this).get(AIR_DB);
        let sm;
        const data = await airDb.find.sheet({
            from: [
                sm = Q.SharingMessage
            ],
            select: [
                sm.sharingNode.id,
                sm.id
            ],
            where: sm.sharingNode.id.in(sharingNodeIds)
        });
        for (const record of data) {
            ensureChildArray(sharingMessageIdsBySharingNodeId, record[0])
                .push(record[1]);
        }
        return sharingMessageIdsBySharingNodeId;
    }
}
DI.set(SHARING_MESSAGE_DAO, SharingMessageDao);
//# sourceMappingURL=SharingMessageDao.js.map