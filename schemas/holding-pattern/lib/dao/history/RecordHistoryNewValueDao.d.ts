import { RecordHistory_LocalId } from '../../ddl/ddl';
import { BaseRecordHistoryNewValueDao, IBaseRecordHistoryNewValueDao, IRecordHistoryNewValue } from '../../generated/generated';
export interface IRecordHistoryNewValueDao extends IBaseRecordHistoryNewValueDao {
    findByRecordHistory_LocalIdIn(RecordHistory_LocalIds: RecordHistory_LocalId[]): Promise<IRecordHistoryNewValue[]>;
}
export declare class RecordHistoryNewValueDao extends BaseRecordHistoryNewValueDao implements IRecordHistoryNewValueDao {
    findByRecordHistory_LocalIdIn(RecordHistory_LocalIds: RecordHistory_LocalId[]): Promise<IRecordHistoryNewValue[]>;
}
//# sourceMappingURL=RecordHistoryNewValueDao.d.ts.map