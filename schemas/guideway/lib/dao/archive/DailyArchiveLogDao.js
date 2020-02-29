import { AIR_DB } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { DAILY_ARCHIVE_LOG_DAO } from '../../tokens';
import { BaseDailyArchiveLogDao, Q } from '../../generated/generated';
export class DailyArchiveLogDao extends BaseDailyArchiveLogDao {
    async insertValues(values) {
        const dbEntity = Q.db.currentVersion.entityMapByName.DailyArchiveLog;
        let dal;
        const airDb = await container(this).get(AIR_DB);
        return await airDb.insertValues(dbEntity, {
            insertInto: dal = Q.DailyArchiveLog,
            columns: [
                dal.repository.id,
                dal.dateNumber,
                dal.numberOfChanges
            ],
            values
        });
    }
}
DI.set(DAILY_ARCHIVE_LOG_DAO, DailyArchiveLogDao);
//# sourceMappingURL=DailyArchiveLogDao.js.map