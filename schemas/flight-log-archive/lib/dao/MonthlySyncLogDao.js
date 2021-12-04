import { AIRPORT_DATABASE, and } from '@airport/air-control';
import { container, DI } from '@airport/di';
import { MONTHLY_SYNC_LOG_DAO } from '../tokens';
import { BaseMonthlySyncLogDao } from '../generated/baseDaos';
import { Q } from '../generated/qApplication';
export class MonthlySyncLogDao extends BaseMonthlySyncLogDao {
    async findAllForDatabase(databaseId, synced, callback) {
        let dsl;
        const airDb = await container(this).get(AIRPORT_DATABASE);
        await airDb.find.sheet({
            from: [
                dsl = Q.MonthlySyncLog
            ],
            select: [
                dsl.repositoryId,
                dsl.month
            ],
            where: and(dsl.databaseId.equals(databaseId), dsl.synced.equals(synced))
        }, 1000, (syncSyncLogRows) => {
            callback(syncSyncLogRows);
        });
    }
    async updateSyncStatus(databaseId, repositoryIds, synced) {
        let dsl;
        await this.db.updateWhere({
            update: dsl = Q.MonthlySyncLog,
            set: {
                synced
            },
            where: and(dsl.databaseId.equals(databaseId), dsl.repositoryId.in(repositoryIds))
        });
    }
}
DI.set(MONTHLY_SYNC_LOG_DAO, MonthlySyncLogDao);
//# sourceMappingURL=MonthlySyncLogDao.js.map