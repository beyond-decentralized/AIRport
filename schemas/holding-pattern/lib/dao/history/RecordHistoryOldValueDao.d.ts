import { BaseRecordHistoryOldValueDao, IBaseRecordHistoryOldValueDao } from "../../generated/generated";
import { IRecordHistoryOldValue, RecordHistoryId } from "../../index";
export interface IRecordHistoryOldValueDao extends IBaseRecordHistoryOldValueDao {
    findByRecordHistoryIdIn(recordHistoryIds: RecordHistoryId[]): Promise<IRecordHistoryOldValue[]>;
}
export declare class RecordHistoryOldValueDao extends BaseRecordHistoryOldValueDao implements IRecordHistoryOldValueDao {
    findByRecordHistoryIdIn(recordHistoryIds: RecordHistoryId[]): Promise<IRecordHistoryOldValue[]>;
}
