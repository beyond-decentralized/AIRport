"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const baseDaos_1 = require("../generated/baseDaos");
const qSchema_1 = require("../generated/qSchema");
class DailySyncLogDao extends baseDaos_1.BaseDailySyncLogDao {
    async insertValues(values) {
        const dbEntity = qSchema_1.Q.db.currentVersion.entityMapByName.RealtimeSyncLog;
        let dsl;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        await airDb.insertValues(dbEntity, {
            insertInto: dsl = qSchema_1.Q.DailySyncLog,
            columns: [
                dsl.databaseId,
                dsl.repositoryId,
                // dsl.synced,
                dsl.date
            ],
            values
        });
    }
    async findAllForDatabase(databaseId, synced, callback) {
        let dsl;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        await airDb.find.sheet({
            from: [
                dsl = qSchema_1.Q.DailySyncLog
            ],
            select: [
                dsl.repositoryId,
                dsl.date
            ],
            where: // and(
            dsl.databaseId.equals(databaseId),
        }, 1000, (syncSyncLogRows) => {
            callback(syncSyncLogRows);
        });
    }
    async updateSyncStatus(databaseId, repositoryIds, synced) {
        let dsl;
        await this.db.updateWhere({
            update: dsl = qSchema_1.Q.DailySyncLog,
            set: {
                synced
            },
            where: air_control_1.and(dsl.databaseId.equals(databaseId), dsl.repositoryId.in(repositoryIds))
        });
    }
    async findMonthlyResults(databaseIds, fromDateInclusive, toDateExclusive) {
        let dsl;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        return await airDb.find.sheet({
            from: [
                dsl = qSchema_1.Q.DailySyncLog
            ],
            select: air_control_1.distinct([
                dsl.databaseId,
                dsl.repositoryId,
            ]),
            where: air_control_1.and(dsl.databaseId.in(databaseIds), dsl.date.greaterThanOrEquals(fromDateInclusive), dsl.date.lessThan(toDateExclusive)),
            orderBy: [
                dsl.databaseId.asc(),
                dsl.repositoryId.asc()
            ]
        });
    }
}
exports.DailySyncLogDao = DailySyncLogDao;
di_1.DI.set(diTokens_1.DAILY_SYNC_LOG_DAO, DailySyncLogDao);
//# sourceMappingURL=DailySyncLogDao.js.map