import { DI } from '@airport/di';
import { BaseSynchronizationConflictValuesDao, Q } from '../../generated/generated';
import { SYNCHRONIZATION_CONFLICT_VALUES_DAO } from '../../tokens';
export class SynchronizationConflictValuesDao extends BaseSynchronizationConflictValuesDao {
    async insert(synchronizationConflictValues) {
        let scv;
        const values = [];
        for (const synchronizationConflictValue of synchronizationConflictValues) {
            values.push([
                synchronizationConflictValue.synchronizationConflict.id,
                synchronizationConflictValue.columnIndex
            ]);
        }
        await this.db.insertValues({
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