import { DI } from '@airport/di';
import { REC_HIST_NEW_VALUE_DAO } from '../../tokens';
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
DI.set(REC_HIST_NEW_VALUE_DAO, RecordHistoryNewValueDao);
//# sourceMappingURL=RecordHistoryNewValueDao.js.map