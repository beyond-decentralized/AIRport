"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const baseDaos_1 = require("../generated/baseDaos");
const qSchema_1 = require("../generated/qSchema");
class DailyArchiveDao extends baseDaos_1.BaseDailyArchiveDao {
    constructor(airportDb, utils) {
        super(utils);
        this.airportDb = airportDb;
    }
    async addRecords(values) {
        const dbEntity = qSchema_1.Q.db.currentVersion.entityMapByName.DailyArchive;
        let da;
        await this.airportDb.db.insertValues(dbEntity, {
            insertInto: da = qSchema_1.Q.DailyArchive,
            columns: [
                da.repository.id,
                da.dailyArchiveLog.dateNumber,
                da.repositoryData
            ],
            values
        });
    }
    async findForRepositoryIdsOnDates(repositoryIds, dates) {
        const whereClauseFragments = [];
        let i = -1;
        let dsl = qSchema_1.Q.DailyArchive;
        for (const repositoryId of repositoryIds) {
            const repositoryDates = dates[++i];
            whereClauseFragments.push(air_control_1.and(dsl.repository.id.equals(repositoryId), dsl.dailyArchiveLog.dateNumber.in(repositoryDates)));
        }
        return await this.airportDb.find.sheet({
            from: [
                dsl
            ],
            select: [
                dsl.repository.id,
                dsl.dailyArchiveLog.dateNumber,
                dsl.repositoryData
            ],
            where: air_control_1.or(...whereClauseFragments)
        });
    }
}
exports.DailyArchiveDao = DailyArchiveDao;
//# sourceMappingURL=DailyArchiveDao.js.map