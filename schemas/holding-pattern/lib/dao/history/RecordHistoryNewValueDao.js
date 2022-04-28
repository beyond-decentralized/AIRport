import { BaseRecordHistoryNewValueDao, Q } from '../../generated/generated';
export class RecordHistoryNewValueDao extends BaseRecordHistoryNewValueDao {
    async findByRecordHistoryIdIn(recordHistoryIds) {
        let rhnv;
        return await this.db.find.tree({
            select: {},
            from: [
                rhnv = Q.RecordHistoryNewValue
            ],
            where: rhnv.recordHistory.id.in(recordHistoryIds)
        });
    }
}
//# sourceMappingURL=RecordHistoryNewValueDao.js.map