import { RecordHistoryId } from '../../ddl/ddl';
import { BaseRecordHistoryOldValueDao, IBaseRecordHistoryOldValueDao } from '../../generated/generated';
import { IRecordHistoryOldValue } from '../../generated/generated';
export interface IRecordHistoryOldValueDao extends IBaseRecordHistoryOldValueDao {
    findByRecordHistoryIdIn(recordHistoryIds: RecordHistoryId[]): Promise<IRecordHistoryOldValue[]>;
}
export declare class RecordHistoryOldValueDao extends BaseRecordHistoryOldValueDao implements IRecordHistoryOldValueDao {
    findByRecordHistoryIdIn(recordHistoryIds: RecordHistoryId[]): Promise<IRecordHistoryOldValue[]>;
}
//# sourceMappingURL=RecordHistoryOldValueDao.d.ts.map