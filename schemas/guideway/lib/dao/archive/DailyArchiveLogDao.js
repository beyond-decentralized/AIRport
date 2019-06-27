"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class DailyArchiveLogDao extends generated_1.BaseDailyArchiveLogDao {
    async insertValues(values) {
        const dbEntity = generated_1.Q.db.currentVersion.entityMapByName.DailyArchiveLog;
        let dal;
        const airDb = await di_1.DI.get(air_control_1.AIR_DB);
        return await airDb.insertValues(dbEntity, {
            insertInto: dal = generated_1.Q.DailyArchiveLog,
            columns: [
                dal.repository.id,
                dal.dateNumber,
                dal.numberOfChanges
            ],
            values
        });
    }
}
exports.DailyArchiveLogDao = DailyArchiveLogDao;
di_1.DI.set(diTokens_1.DAILY_ARCHIVE_LOG_DAO, DailyArchiveLogDao);
//# sourceMappingURL=DailyArchiveLogDao.js.map