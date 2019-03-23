"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../diTokens");
const baseDaos_1 = require("../generated/baseDaos");
const qSchema_1 = require("../generated/qSchema");
class DailyArchiveDao extends baseDaos_1.BaseDailyArchiveDao {
    async addRecords(values) {
        const dbEntity = qSchema_1.Q.db.currentVersion.entityMapByName.DailyArchive;
        let da;
        await this.airDb.db.insertValues(dbEntity, {
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
        return await this.airDb.find.sheet({
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
di_1.DI.set(diTokens_1.DAILY_ARCHIVE_DAO, DailyArchiveDao);
//# sourceMappingURL=DailyArchiveDao.js.map