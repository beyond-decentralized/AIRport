"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const baseDaos_1 = require("../generated/baseDaos");
const qSchema_1 = require("../generated/qSchema");
class MonthlySyncLogDao extends baseDaos_1.BaseMonthlySyncLogDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async findAllForDatabase(databaseId, synced, callback) {
        let dsl;
        await this.airportDb.find.sheet({
            from: [
                dsl = qSchema_1.Q.MonthlySyncLog
            ],
            select: [
                dsl.repositoryId,
                dsl.month
            ],
            where: air_control_1.and(dsl.databaseId.equals(databaseId), dsl.synced.equals(synced))
        }, 1000, (syncSyncLogRows) => {
            callback(syncSyncLogRows);
        });
    }
    async updateSyncStatus(databaseId, repositoryIds, synced) {
        let dsl;
        await this.db.updateWhere({
            update: dsl = qSchema_1.Q.MonthlySyncLog,
            set: {
                synced
            },
            where: air_control_1.and(dsl.databaseId.equals(databaseId), dsl.repositoryId.in(repositoryIds))
        });
    }
}
exports.MonthlySyncLogDao = MonthlySyncLogDao;
//# sourceMappingURL=MonthlySyncLogDao.js.map