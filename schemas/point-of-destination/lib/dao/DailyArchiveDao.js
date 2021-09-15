import { AIRPORT_DATABASE, and, or } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { DAILY_ARCHIVE_DAO } from '../tokens';
import { BaseDailyArchiveDao } from '../generated/baseDaos';
import { Q } from '../generated/qSchema';
export class DailyArchiveDao extends BaseDailyArchiveDao {
    async addRecords(values) {
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const dbEntity = Q.db.currentVersion[0].schemaVersion
            .entityMapByName.DailyArchive;
        let da;
        await airDb.insertValues({
            insertInto: da = Q.DailyArchive,
            columns: [
                da.repository.id,
                da.dailyArchiveLog.dateNumber,
                da.repositoryData
            ],
            values
        }, {
            dbEntity
        });
    }
    async findForRepositoryIdsOnDates(repositoryIds, dates) {
        const airDb = await container(this).get(AIRPORT_DATABASE);
        const whereClauseFragments = [];
        let i = -1;
        let dsl = Q.DailyArchive;
        for (const repositoryId of repositoryIds) {
            const repositoryDates = dates[++i];
            whereClauseFragments.push(and(dsl.repository.id.equals(repositoryId), dsl.dailyArchiveLog.dateNumber.in(repositoryDates)));
        }
        return await airDb.find.sheet({
            from: [
                dsl
            ],
            select: [
                dsl.repository.id,
                dsl.dailyArchiveLog.dateNumber,
                dsl.repositoryData
            ],
            where: or(...whereClauseFragments)
        });
    }
}
DI.set(DAILY_ARCHIVE_DAO, DailyArchiveDao);
//# sourceMappingURL=DailyArchiveDao.js.map