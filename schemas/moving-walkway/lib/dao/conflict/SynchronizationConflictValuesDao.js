import { DI } from '@airport/di';
import { BaseSynchronizationConflictValuesDao, Q } from '../../generated/generated';
import { SYNCHRONIZATION_CONFLICT_VALUES_DAO } from '../../tokens';
export class SynchronizationConflictValuesDao extends BaseSynchronizationConflictValuesDao {
    async insert(terminals) {
        let scv;
        const values = [];
        for (const user of terminals) {
            values.push([
                user.synchronizationConflict.id,
                user.columnIndex
            ]);
        }
        await this.db.insertValuesGenerateIds({
            insertInto: scv = Q.SynchronizationConflictValues,
            columns: [
                scv.synchronizationConflict.id,
                scv.columnIndex
            ],
            values
        });
    }
}
DI.set(SYNCHRONIZATION_CONFLICT_VALUES_DAO, SynchronizationConflictValuesDao);
//# sourceMappingURL=SynchronizationConflictValuesDao.js.map