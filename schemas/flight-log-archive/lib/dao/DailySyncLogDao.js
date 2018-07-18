"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const baseDaos_1 = require("../generated/baseDaos");
const qSchema_1 = require("../generated/qSchema");
class DailySyncLogDao extends baseDaos_1.BaseDailySyncLogDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async insertValues(values) {
        const dbEntity = qSchema_1.Q.db.currentVersion.entityMapByName.RealtimeSyncLog;
        let dsl;
        await this.airportDb.db.insertValues(dbEntity, {
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
        await this.airportDb.find.sheet({
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
        return await this.airportDb.find.sheet({
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
//# sourceMappingURL=DailySyncLogDao.js.map