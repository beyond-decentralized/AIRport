import { AIRPORT_DATABASE, and, distinct } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { BaseDailySyncLogDao } from '../generated/baseDaos';
import { Q } from '../generated/qApplication';
import { DAILY_SYNC_LOG_DAO } from '../tokens';
export class DailySyncLogDao extends BaseDailySyncLogDao {
    async insertValues(values) {
        const dbEntity = Q.db.currentVersion[0].applicationVersion
            .entityMapByName.RealtimeSyncLog;
        let dsl;
        const airDb = await container(this).get(AIRPORT_DATABASE);
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
        const airDb = await container(this).get(AIRPORT_DATABASE);
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
            // dsl.synced.equals(synced)
            // )
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
        const airDb = await container(this).get(AIRPORT_DATABASE);
        return await airDb.find.sheet({
            from: [
                dsl = Q.DailySyncLog
            ],
            select: distinct([
                dsl.databaseId,
                dsl.repositoryId,
                // dsl.synced
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