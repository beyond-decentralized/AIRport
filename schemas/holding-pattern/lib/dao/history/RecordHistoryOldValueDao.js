import { BaseRecordHistoryOldValueDao } from '../../generated/generated';
import { Q } from '../../index';
export class RecordHistoryOldValueDao extends BaseRecordHistoryOldValueDao {
    async findByRecordHistoryIdIn(recordHistoryIds) {
        let rhov;
        return await this.db.find.tree({
            select: {},
            from: [
                rhov = Q.RecordHistoryOldValue
            ],
            where: rhov.recordHistory.id.in(recordHistoryIds)
        });
    }
}
//# sourceMappingURL=RecordHistoryOldValueDao.js.map