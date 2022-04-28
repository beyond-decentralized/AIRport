import { BaseSynchronizationConflictValuesDao, Q } from '../../generated/generated';
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
//# sourceMappingURL=SynchronizationConflictValuesDao.js.map