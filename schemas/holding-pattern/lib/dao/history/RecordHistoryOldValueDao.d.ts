import { RecordHistory_LocalId } from '../../ddl/ddl';
import { BaseRecordHistoryOldValueDao, IBaseRecordHistoryOldValueDao } from '../../generated/generated';
import { IRecordHistoryOldValue } from '../../generated/generated';
export interface IRecordHistoryOldValueDao extends IBaseRecordHistoryOldValueDao {
    findByRecordHistory_LocalIdIn(RecordHistory_LocalIds: RecordHistory_LocalId[]): Promise<IRecordHistoryOldValue[]>;
}
export declare class RecordHistoryOldValueDao extends BaseRecordHistoryOldValueDao implements IRecordHistoryOldValueDao {
    findByRecordHistory_LocalIdIn(RecordHistory_LocalIds: RecordHistory_LocalId[]): Promise<IRecordHistoryOldValue[]>;
}
//# sourceMappingURL=RecordHistoryOldValueDao.d.ts.map