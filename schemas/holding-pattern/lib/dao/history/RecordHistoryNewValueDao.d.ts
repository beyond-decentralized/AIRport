import { RecordHistoryId } from '../../ddl/ddl';
import { BaseRecordHistoryNewValueDao, IBaseRecordHistoryNewValueDao, IRecordHistoryNewValue } from '../../generated/generated';
export interface IRecordHistoryNewValueDao extends IBaseRecordHistoryNewValueDao {
    findByRecordHistoryIdIn(recordHistoryIds: RecordHistoryId[]): Promise<IRecordHistoryNewValue[]>;
}
export declare class RecordHistoryNewValueDao extends BaseRecordHistoryNewValueDao implements IRecordHistoryNewValueDao {
    findByRecordHistoryIdIn(recordHistoryIds: RecordHistoryId[]): Promise<IRecordHistoryNewValue[]>;
}
//# sourceMappingURL=RecordHistoryNewValueDao.d.ts.map