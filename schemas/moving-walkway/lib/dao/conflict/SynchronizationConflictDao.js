import { DI } from '@airport/di';
import { BaseSynchronizationConflictDao, Q } from '../../generated/generated';
import { SYNCHRONIZATION_CONFLICT_DAO } from '../../tokens';
export class SynchronizationConflictDao extends BaseSynchronizationConflictDao {
    async insert(terminals) {
        let sc;
        const values = [];
        for (const user of terminals) {
            values.push([
                user.type,
                user.acknowledged,
                user.repository.id,
                user.overwrittenRecordHistory.id,
                user.overwritingRecordHistory.id
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: sc = Q.SynchronizationConflict,
            columns: [
                sc.type,
                sc.acknowledged,
                sc.repository.id,
                sc.overwrittenRecordHistory.id,
                sc.overwritingRecordHistory.id
            ],
            values
        });
    }
}
DI.set(SYNCHRONIZATION_CONFLICT_DAO, SynchronizationConflictDao);
//# sourceMappingURL=SynchronizationConflictDao.js.map