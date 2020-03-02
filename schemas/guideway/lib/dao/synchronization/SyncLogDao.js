"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ddl_1 = require("../../ddl/ddl");
const tokens_1 = require("../../tokens");
const generated_1 = require("../../generated/generated");
class SyncLogDao extends generated_1.BaseSyncLogDao {
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.RealtimeSyncLog;
        let sl;
        const airDb = await di_1.container(this).get(air_control_1.AIR_DB);
        await airDb.insertValues(dbEntity, {
            insertInto: sl = generated_1.Q.SyncLog,
            columns: [
                sl.repositoryTransactionBlock.id,
                // sl.repositoryTransactionBlockAddDatetime,
                sl.sharingMessage.id,
            ],
            values
        });
    }
    async selectSyncedTerminalRepositories(fromDateInclusive, toDateExlusive, repositoryIds) {
        const syncedTerminalRepositories = [];
        const dbSyncStatuses = await this.selectTmSyncStatusForAgtRepositoryIds(fromDateInclusive, toDateExlusive, repositoryIds);
        for (const dbSyncStatus of dbSyncStatuses) {
            if (dbSyncStatus[2] === ddl_1.AgtSharingMessageAcknowledged.ACKNOWLEDGED) {
                syncedTerminalRepositories.push([dbSyncStatus[0], dbSyncStatus[1]]);
            }
        }
        return syncedTerminalRepositories;
    }
    /**
     * This query is input into insert of DailySyncLog records.
     *
     * Cursor consideration:  ORDER BY and Cursor may not work well together.  Cursor is not
     * as big of a need here, since the query is limited by repository ids and is only run
     * by the archival process.
     *
     * @param {AgtAgtRepositoryTransactionBlockAddDatetime} fromDateInclusive
     * @param {AgtAgtRepositoryTransactionBlockAddDatetime} toDateExlusive
     * @param {AgtRepositoryId[]} repositoryIds
     * @returns {Promise<TerminalSyncStatus[]>}
     */
    async selectTmSyncStatusForAgtRepositoryIds(fromDateInclusive, toDateExlusive, repositoryIds) {
        let sl, sm, rtb;
        // AgtRepositoryTransactionBlock Sub-Query
        const smrtb = air_control_1.tree({
            from: [
                sl = generated_1.Q.SyncLog,
                sm = sl.sharingMessage.innerJoin(),
                rtb = sl.repositoryTransactionBlock.innerJoin()
            ],
            select: {
                repositoryTransactionBlockId: rtb.id,
                terminalId: sm.terminal.id,
                repositoryId: rtb.repository.id,
                maxAcked: air_control_1.max(sm.acknowledged),
            },
            where: air_control_1.and(
            // sl.repositoryTransactionBlockAddDatetime.greaterThanOrEquals(fromDateInclusive),
            // sl.repositoryTransactionBlockAddDatetime.lessThan(toDateExlusive),
            rtb.addDatetime.greaterThanOrEquals(fromDateInclusive), rtb.addDatetime.lessThan(toDateExlusive), rtb.repository.id.in(repositoryIds)),
            groupBy: [
                rtb.id,
                sm.terminal.id,
                rtb.repository.id
            ],
            orderBy: [
                rtb.repository.id.asc(),
                sm.terminal.id.asc(),
            ]
        });
        const airDb = await di_1.container(this).get(air_control_1.AIR_DB);
        return await airDb.find.sheet({
            from: [
                smrtb
            ],
            select: [
                smrtb.terminalId,
                smrtb.repositoryId,
                air_control_1.min(smrtb.maxAcked)
            ],
            groupBy: [
                smrtb.terminalId,
                smrtb.repositoryId
            ]
        });
    }
}
exports.SyncLogDao = SyncLogDao;
di_1.DI.set(tokens_1.SYNC_LOG_DAO, SyncLogDao);
//# sourceMappingURL=SyncLogDao.js.map