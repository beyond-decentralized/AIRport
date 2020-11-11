import { AIR_DB, and, distinct } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { BaseDailySyncLogDao } from '../generated/baseDaos';
import { Q } from '../generated/qSchema';
import { DAILY_SYNC_LOG_DAO } from '../tokens';
export class DailySyncLogDao extends BaseDailySyncLogDao {
    async insertValues(values) {
        const dbEntity = Q.db.currentVersion.entityMapByName.RealtimeSyncLog;
        let dsl;
        const airDb = await container(this).get(AIR_DB);
        await airDb.insertValues({
            insertInto: dsl = Q.DailySyncLog,
            columns: [
                dsl.databaseId,
                dsl.repositoryId,
                // dsl.synced,
                dsl.date
            ],
            values
        }, {
            dbEntity
        });
    }
    async findAllForDatabase(databaseId, synced, callback) {
        let dsl;
        const airDb = await container(this).get(AIR_DB);
        await airDb.find.sheet({
            from: [
                dsl = Q.DailySyncLog
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
            update: dsl = Q.DailySyncLog,
            set: {
                synced
            },
            where: and(dsl.databaseId.equals(databaseId), dsl.repositoryId.in(repositoryIds))
        });
    }
    async findMonthlyResults(databaseIds, fromDateInclusive, toDateExclusive) {
        let dsl;
        const airDb = await container(this).get(AIR_DB);
        return await airDb.find.sheet({
            from: [
                dsl = Q.DailySyncLog
            ],
            select: distinct([
                dsl.databaseId,
                dsl.repositoryId,
            ]),
            where: and(dsl.databaseId.in(databaseIds), dsl.date.greaterThanOrEquals(fromDateInclusive), dsl.date.lessThan(toDateExclusive)),
            orderBy: [
                dsl.databaseId.asc(),
                dsl.repositoryId.asc()
            ]
        });
    }
}
DI.set(DAILY_SYNC_LOG_DAO, DailySyncLogDao);
//# sourceMappingURL=DailySyncLogDao.js.map